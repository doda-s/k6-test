#TODO Testar script de inicialização do Linux (run-linux.sh)
testfrontend=false
testfrontendui=false
playwright_pid=""

cleanup() {
    echo ""
    echo "Finishing script..."
    if [ -n "$playwright_pid" ] && ps -p $playwright_pid > /dev/null 2>&1; then
        echo "Finishing Playwright (PID $playwright_pid)..."
        kill $playwright_pid
    fi
    echo "Done."
    exit 0
}

trap cleanup SIGINT

for arg in "$@"; do
    if [[ "$arg" == "--test" ]]; then
        testfrontend=true
    elif [[ "$arg" == "--ui" ]]; then
        testfrontendui=true
    fi
done

DIR="$(pwd)/grafana"

echo "Checking directories..."

if [ -d "$DIR" ]; then
    echo "The directory $DIR exists."
else
    echo "$DIR does not exist."
    echo "Creating directory: $DIR..."
    mkdir -p "$DIR"
    echo "Directory created."
fi

echo "Starting Docker containers..."
docker compose up -d
echo "Done."

echo "Starting tests..."
sleep 10

if [ "$testfrontend" = true ]; then
    if [ "$testfrontendui" = true ]; then
        npx playwright test --ui &
        playwright_pid=$!
    else
        npx playwright test &
        playwright_pid=$!
    fi
    echo "Tests done."
fi

echo "Starting frontend..."
node frontend.js

cleanup