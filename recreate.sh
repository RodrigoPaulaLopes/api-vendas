docker compose up --build --remove-orphans -d 

docker exec -it seller-api yarn typeorm migration:run