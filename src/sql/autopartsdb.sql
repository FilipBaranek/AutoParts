-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: mysql
-- Čas generovania: So 30.Nov 2024, 00:26
-- Verzia serveru: 8.4.3
-- Verzia PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Databáza: `autopartsdb`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `cars`
--

CREATE TABLE `cars` (
  `id` int NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `engine` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dáta pre tabuľku `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `engine`) VALUES
(1, 'BMW', '318i', '1.8 1996'),
(2, 'BMW', '318i', '1.8 2000'),
(3, 'BMW', '320i', '2.0 2005'),
(4, 'BMW', '320i', '2.0 2010'),
(5, 'BMW', '330i', '3.0 2015'),
(6, 'BMW', '330i', '3.0 2020'),
(7, 'Audi', 'A3', '1.9tdi 2018'),
(8, 'Audi', 'A3', '1.8T 2020'),
(9, 'Audi', 'A4', '1.8T 2019'),
(10, 'Audi', 'A4', '2.0TFSI 2021'),
(11, 'Audi', 'A6', '2.0tdi 2017'),
(12, 'Audi', 'A6', '2.0TFSI 2022'),
(13, 'Mercedes-Benz', 'C-Class', 'C-Class 2017'),
(14, 'Mercedes-Benz', 'C-Class', 'C-Class 2019'),
(15, 'Mercedes-Benz', 'E-Class', 'E-Class 2020'),
(16, 'Mercedes-Benz', 'E-Class', 'E-Class 2021'),
(17, 'Mercedes-Benz', 'S-Class', 'S-Class 2018'),
(18, 'Mercedes-Benz', 'S-Class', 'S-Class 2022');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `parts`
--

CREATE TABLE `parts` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `partname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dáta pre tabuľku `parts`
--

INSERT INTO `parts` (`id`, `category`, `partname`, `image`) VALUES
(1, 'Engine', 'Rozvodová sada', 'https://www.litep4x4.cz/gallery/products/middle/lr032527-rozvodova-sada-vcetne-vodni-pumpy.jpg'),
(2, 'Engine', 'Remene', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/212.jpg'),
(3, 'Engine', 'Sviečky', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/43.jpg'),
(4, 'Engine', 'Snímače', 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/15032.png'),
(5, 'Engine', 'Olej a filtre', 'https://www.rapidpneu.sk/wp-content/uploads/2022/04/Dizajn-bez-nazvu-29.jpg'),
(6, 'Engine', 'Chladiaci systém', 'https://media.autoteileprofi.de/360_photos/8613936/preview.jpg'),
(7, 'Brakes', 'Brzdové kotúče', 'https://media.autodoc.de/360_photos/7887464/h-preview.jpg'),
(8, 'Brakes', 'Brzdové platničky', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/19.png'),
(9, 'Brakes', 'Brzdové hadice', 'https://cdn.myshoptet.com/usr/www.eres-racing.sk/user/shop/detail/64162-1_spojkova-hadica-hel-performance-1ks.jpg?65e08e16'),
(10, 'Brakes', 'Hlavný brzdový valec', 'https://www.mannol.sk/fotky25524/fotos/_vyr_13927_21027099.jpg'),
(11, 'Brakes', 'Repasná sada', 'https://www.skoda-diely.sk/data/items/89/52cd411145317_t.jpg'),
(12, 'Brakes', 'Brzdová kvapalina', 'https://servisolejov.sk/images/products-cache/4cab2d0c410dad669c698f69f6d1b305/143_w700_h700.jpg'),
(13, 'Steering', 'Čapy riadenia', 'https://oleje.autohouse.sk/image/cache/data/febi-bilstein/09682_1-256x192.jpg'),
(14, 'Steering', 'Tyčky riadenia', 'https://oleje.autohouse.sk/image/cache/data/febi-bilstein/27095_1-700x525.jpg'),
(15, 'Steering', 'Manžety', 'https://oleje.autohouse.sk/image/data/categories/manzety-riadenia.jpg'),
(16, 'Steering', 'Servo pumpa', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/171.png'),
(17, 'Steering', 'Hrebeň riadenia', 'https://img.linemedia.com/img/s/spare-part-steering-rack-Hreben-rizeni---1726061060849420220_common--24091116242075796600.jpg'),
(18, 'Steering', 'Servo-olej', 'https://www.agropol.sk/images/stories/virtuemart/product/38_ok5.jpg'),
(19, 'Brakes', 'Brzdové kotúče', 'https://media.autodoc.de/360_photos/7887464/h-preview.jpg'),
(20, 'Brakes', 'Brzdové platničky', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/19.png'),
(21, 'Brakes', 'Brzdové hadice', 'https://cdn.myshoptet.com/usr/www.eres-racing.sk/user/shop/detail/64162-1_spojkova-hadica-hel-performance-1ks.jpg?65e08e16'),
(22, 'Brakes', 'Hlavný brzdový valec', 'https://www.mannol.sk/fotky25524/fotos/_vyr_13927_21027099.jpg'),
(23, 'Brakes', 'Repasná sada', 'https://www.skoda-diely.sk/data/items/89/52cd411145317_t.jpg'),
(24, 'Brakes', 'Brzdová kvapalina', 'https://servisolejov.sk/images/products-cache/4cab2d0c410dad669c698f69f6d1b305/143_w700_h700.jpg'),
(25, 'Steering', 'Čapy riadenia', 'https://oleje.autohouse.sk/image/cache/data/febi-bilstein/09682_1-256x192.jpg'),
(26, 'Steering', 'Tyčky riadenia', 'https://oleje.autohouse.sk/image/cache/data/febi-bilstein/27095_1-700x525.jpg'),
(27, 'Steering', 'Manžety', 'https://oleje.autohouse.sk/image/data/categories/manzety-riadenia.jpg'),
(28, 'Steering', 'Servo pumpa', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/171.png'),
(29, 'Steering', 'Hrebeň riadenia', 'https://img.linemedia.com/img/s/spare-part-steering-rack-Hreben-rizeni---1726061060849420220_common--24091116242075796600.jpg'),
(30, 'Steering', 'Servo-olej', 'https://www.agropol.sk/images/stories/virtuemart/product/38_ok5.jpg'),
(31, 'Suspension', 'Tlmiče', 'https://www.mall.cz/i/109739973'),
(32, 'Suspension', 'Pružiny', 'https://cdn.pkwteile.de/thumb/assets/ersatz_categories/200x200/129.jpg'),
(33, 'Suspension', 'Ramená', 'https://s13emagst.akamaized.net/products/42748/42747716/images/res_762842836bc14837e27e297abd0b8a37.jpg'),
(34, 'Suspension', 'Silentbloky', 'https://www.autodielygafa.sk/server/Uploads/DescriptionFiles/Blog/113/dc6uX7R.jpg'),
(35, 'Suspension', 'Čapy', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/64.jpg'),
(36, 'Suspension', 'Stabilizátory', 'https://motone.cz/306945-large_default/tycka-stabilizatoru-renault-predni-megane-scenic-08-16-160600008.jpg'),
(37, 'Clutch', 'Spojková sada', 'https://www.comco.sk/img/landing-spojky-spojkove-sady-zotrvacnik/spojkova-sada.jpg'),
(38, 'Clutch', 'Lamela', 'https://digital-assets.tecalliance.services/images/3200/09f91340e07281ab30d2e690007b1b64f17d220e.jpg'),
(39, 'Clutch', 'Prítlačný tanier', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/218.jpg'),
(40, 'Clutch', 'Zotrvačník', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/222.png'),
(41, 'Clutch', 'Spojkové ložisko', 'https://media.autoteiledirekt.de/360_photos/15799535/preview.jpg'),
(42, 'Clutch', 'Spojkový valček', 'https://vsautodiely.sk/wp-content/uploads/2020/06/1348734-1.jpg'),
(43, 'Exhaust', 'Koncový tlmič', 'https://www.autodielygafa.sk/server/Uploads/ProductPhotos/excel_RME10160_original_Tlumik-Koncowy-60mm-RM_[336110]_0c20274c9e34.jpg'),
(44, 'Exhaust', 'Stredový tlmič', 'https://www.comco.sk/files/tecdoc/polmo/7/_640x480/24-17.jpg'),
(45, 'Exhaust', 'Katalyzátor', 'https://race-shop.sk/362722-large_default/univerzalny-katalyzator-magnaflow-53005-euro-1-2-57mm.jpg'),
(46, 'Exhaust', 'Trúbky', 'https://www.tuningcardesign.cz/_obchody/tuningcardesign.web5.cz/prilohy/1666/nerezove-vyfukove-trubka-rovna-hjs-delka-100cm-x-p-1.jpg.big.jpg'),
(47, 'Exhaust', 'Spóny a lepidlá', 'https://www.auto-vyfuk.sk/content/images/thumbs/0094683_fa-114-943_300.png'),
(48, 'Exhaust', 'Tesnenia', 'https://www.tuningcardesign.sk/_obchody/tuningcardesign.web5.cz/prilohy/86/tesneni-na-vyfuk-76mm-2-srouby-0.jpg.big.jpg');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Filip', 'filipbaranek22@gmail.com', '$2a$08$Lx4oFBsuDfez0PSgI8gfq.dTKmIzI6ew9RGGrXtKWJSMUUpBjHlFm');





ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `parts`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);



ALTER TABLE `cars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

ALTER TABLE `parts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
