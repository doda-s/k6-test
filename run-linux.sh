DIR="$(pwd)/grafana"

if [ -d "$DIR" ]; then
echo "Diretório $DIR existe."
else
echo "Criando diretório $DIR..."
mkdir -p "$DIR"
echo "Diretório criado!"
fi

docker compose up -d