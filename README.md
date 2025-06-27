# AutoParts Hub
- E-Shop určený na predaj autodielov
- hodnotenia autodielov
- recenzie na autodiely

## Aktuálna verzia
Je možné vyhľadať diely k dostupným značkám a modelom aut, zanechať/prečítať si hodnotenia a recenzie.

## Technické informácie
- využitie Docker-u (Image pre webovú aplikáciu, databázu MySQL, a phpmyadmin)
- webová aplikácia využíva na backende štruktúru Controller, Service, Model
- databáze MySQL je inicializovaný port 3306
- phpmyadmin stránke je inicializovaný port 80
- hlavnej aplikácii je inicializuovaný port 3000

## Front page
![frontpage](https://github.com/user-attachments/assets/36fd4e98-b919-4d96-b7c1-828f95dcb75a)

## Vyhľadané diely
![vyhladane_diely](https://github.com/user-attachments/assets/a2e5cbeb-5830-4dfe-ab37-9fe25c6ca253)

## Konkrétny produkt a hodnotenie
![produkt](https://github.com/user-attachments/assets/abb5bdb1-e2fa-425f-beb7-a843587a4d17)

## Recenzie
![produkt2](https://github.com/user-attachments/assets/525a125a-8afa-4470-8cc7-779de1b64953)

# Návod na inštaláciu a spustenie aplikácie
1. Stiahnúť z main branch-u zip súbor projektu
2. Extrahovať zip súbor
3. Spustiť / nainštalovať Docker Desktop aplikáciu
4. Otvoriť terminál
5. Dostať sa do adresára kde sa nachádza Dockerfile aplikácie pomocou CLI
6. "Postaviť projekt" pomocou príkazu: docker-compose build
7. Po ukončení build procesu, spustiť aplikáciu pomocou príkazu: docker-compose up
