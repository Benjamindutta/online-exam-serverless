start_db:
	docker compose up -d

stop_db:
	docker compose down

start_server:
	yarn run dev