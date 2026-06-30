#!/usr/bin/env bash
# Study B — honesty-by-construction experiment.
#
# Demonstrates, against a live reference host + the black-box conformance suite, that a
# host CANNOT advertise a capability it does not actually deliver without failing its own
# conformance suite under strict mode (OPENWOP_REQUIRE_BEHAVIOR=true).
#
# The capability under test is the in-memory host's `workflowChainPacks`, whose
# advertisement is bound to LIVE STATE: the host re-evaluates `existsSync(PACK_REGISTRY_DIR)`
# on every /.well-known/openwop request. We drive the three honesty postures purely by
# pointing the registry dir at: a backed dir (advertise + deliver), a missing dir (advertise
# nothing), or an EMPTY dir (advertise support it cannot deliver — the injected lie). No host
# code is modified.
#
# Env (defaults assume sibling repos under one dev root):
#   HOST_DIR  in-memory reference host  (default <root>/openwop-examples/examples/hosts/in-memory)
#   CONF_DIR  conformance suite         (default <root>/openwop/conformance)
#   PORT      host port                 (default 3737)
set -uo pipefail
ROOT="${OPENWOP_DEV_ROOT:-$HOME/dev}"
HOST_DIR="${HOST_DIR:-$ROOT/openwop-examples/examples/hosts/in-memory}"
CONF_DIR="${CONF_DIR:-$ROOT/openwop/conformance}"
PORT="${PORT:-3737}"
SCENARIO="src/scenarios/workflow-chain-host-expansion.test.ts"
BASE="http://127.0.0.1:$PORT"
EMPTY_DIR="$(mktemp -d)"      # exists but contains no packs → the dishonest condition
MISSING_DIR="/tmp/openwop-no-such-registry-$$"  # never created → unbacked condition

HOST_PID=""
stop_host() {
  [ -n "$HOST_PID" ] && kill "$HOST_PID" 2>/dev/null
  pkill -f "tsx src/server.ts" 2>/dev/null
  HOST_PID=""
  # wait until the port stops answering (fully freed) before the next start
  for _ in $(seq 1 30); do curl -sf "$BASE/.well-known/openwop" >/dev/null 2>&1 || return 0; sleep 0.3; done
}
start_host() { # $1 = value for OPENWOP_PACK_REGISTRY_DIR ("" = host default = backed)
  stop_host
  ( cd "$HOST_DIR" && exec env OPENWOP_PORT="$PORT" ${1:+OPENWOP_PACK_REGISTRY_DIR="$1"} \
      node_modules/.bin/tsx src/server.ts ) >/tmp/owop-host.log 2>&1 &
  HOST_PID=$!
  for _ in $(seq 1 40); do curl -sf "$BASE/.well-known/openwop" >/dev/null 2>&1 && return 0; sleep 0.3; done
  echo "host failed to start (see /tmp/owop-host.log)" >&2; return 1
}
advert() { curl -s "$BASE/.well-known/openwop" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);process.stdout.write(JSON.stringify(j.workflowChainPacks??"absent"))})'; }
run() { # $1 = "strict" | "default" ; echo "PASS:p FAIL:f"
  local strict="" ; [ "$1" = strict ] && strict="OPENWOP_REQUIRE_BEHAVIOR=true"
  ( cd "$CONF_DIR" && env OPENWOP_BASE_URL="$BASE" OPENWOP_API_KEY=openwop-inmem-dev-key $strict \
    node node_modules/vitest/vitest.mjs run "$SCENARIO" 2>&1 ) | grep -E '^\s+Tests' | tail -1
}

printf '\n# Study B — honesty-by-construction (live run)\n\n'
printf '| # | Condition | registry dir | advertises | mode | result |\n|---|---|---|---|---|---|\n'

start_host ""           ; A=$(advert); R=$(run strict)  ; printf '| C1 | honest + implemented | backed | %s | strict | %s |\n' "$A" "$R"
start_host "$MISSING_DIR"; A=$(advert); R=$(run default); printf '| C2a | honest minimal | missing | %s | default | %s |\n' "$A" "$R"
start_host "$MISSING_DIR"; A=$(advert); R=$(run strict) ; printf '| C2b | claims coverage, silent | missing | %s | strict | %s |\n' "$A" "$R"
start_host "$EMPTY_DIR"  ; A=$(advert); R=$(run strict) ; printf '| C3 | DISHONEST (advertise, no deliver) | empty | %s | strict | %s |\n' "$A" "$R"

stop_host; rmdir "$EMPTY_DIR" 2>/dev/null
printf '\nExpected: C1 PASS · C2a PASS (honest skip) · C2b FAIL · C3 FAIL (the lie is caught).\n'
