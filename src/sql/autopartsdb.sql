-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: mysql
-- Čas generovania: St 29.Jan 2025, 18:54
-- Verzia serveru: 8.4.3
-- Verzia PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
-- Sťahujem dáta pre tabuľku `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `engine`) VALUES
(1, 'BMW', '318i', '1.8 1996'),
(2, 'BMW', '318i', '1.8 2000'),
(3, 'BMW', '320i', '2.0 2005'),
(4, 'BMW', '320i', '2.0 2010'),
(5, 'BMW', '330i', '3.0 2015'),
(6, 'BMW', '330i', '3.0 2020'),
(7, 'Audi', 'A3', '1.9TDI 2018'),
(8, 'Audi', 'A3', '1.8T 2020'),
(9, 'Audi', 'A4', '1.8T 2019'),
(10, 'Audi', 'A4', '2.0TFSI 2021'),
(11, 'Audi', 'A6', '2.0TDI 2017'),
(12, 'Audi', 'A6', '2.0TFSI 2022'),
(13, 'Mercedes-Benz', 'C-Class', '2.0 2017'),
(14, 'Mercedes-Benz', 'C-Class', '1.6 2019'),
(15, 'Mercedes-Benz', 'E-Class', '1.3 2020'),
(16, 'Mercedes-Benz', 'E-Class', '1.5 2021'),
(17, 'Mercedes-Benz', 'S-Class', '2.5 2017'),
(18, 'Mercedes-Benz', 'S-Class', '3.5 2022');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `categoryname` varchar(100) NOT NULL,
  `partname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `categories`
--

INSERT INTO `categories` (`id`, `categoryname`, `partname`, `image`, `url_name`) VALUES
(1, 'Engine', 'Rozvodová sada', 'https://www.litep4x4.cz/gallery/products/middle/lr032527-rozvodova-sada-vcetne-vodni-pumpy.jpg', 'rozvodova_sada'),
(2, 'Engine', 'Remene', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/212.jpg', 'remene'),
(3, 'Engine', 'Sviečky', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/43.jpg', 'sviecky'),
(4, 'Engine', 'Snímače', 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/15032.png', 'snimace'),
(5, 'Engine', 'Olej a filtre', 'https://www.rapidpneu.sk/wp-content/uploads/2022/04/Dizajn-bez-nazvu-29.jpg', 'olej_a_filtre'),
(6, 'Engine', 'Chladiaci systém', 'https://media.autoteileprofi.de/360_photos/8613936/preview.jpg', 'chladiaci_system'),
(7, 'Brakes', 'Brzdové kotúče', 'https://media.autodoc.de/360_photos/7887464/h-preview.jpg', 'brzdove_kotuce'),
(8, 'Brakes', 'Brzdové platničky', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/19.png', 'brzdove_platnicky'),
(9, 'Brakes', 'Brzdové hadice', 'https://cdn.myshoptet.com/usr/www.eres-racing.sk/user/shop/detail/64162-1_spojkova-hadica-hel-performance-1ks.jpg?65e08e16', 'brzdove_hadice'),
(10, 'Brakes', 'Hlavný brzdový valec', 'https://www.mannol.sk/fotky25524/fotos/_vyr_13927_21027099.jpg', 'hlavny_brzdovy_valec'),
(11, 'Brakes', 'Repasná sada', 'https://www.skoda-diely.sk/data/items/89/52cd411145317_t.jpg', 'repasna_sada'),
(12, 'Brakes', 'Brzdová kvapalina', 'https://servisolejov.sk/images/products-cache/4cab2d0c410dad669c698f69f6d1b305/143_w700_h700.jpg', 'brzdova_kvapalina'),
(13, 'Steering', 'Čapy riadenia', 'https://oleje.autohouse.sk/image/cache/data/febi-bilstein/09682_1-256x192.jpg', 'capy_riadenia'),
(14, 'Steering', 'Tyčky riadenia', 'https://oleje.autohouse.sk/image/cache/data/febi-bilstein/27095_1-700x525.jpg', 'tycky_riadenia'),
(15, 'Steering', 'Manžety', 'https://oleje.autohouse.sk/image/data/categories/manzety-riadenia.jpg', 'manzety'),
(16, 'Steering', 'Servo pumpa', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/171.png', 'servo_pumpa'),
(17, 'Steering', 'Hrebeň riadenia', 'https://img.linemedia.com/img/s/spare-part-steering-rack-Hreben-rizeni---1726061060849420220_common--24091116242075796600.jpg', 'hreben_riadenia'),
(18, 'Steering', 'Servo-olej', 'https://www.agropol.sk/images/stories/virtuemart/product/38_ok5.jpg', 'servo-olej'),
(19, 'Suspension', 'Tlmiče', 'https://www.mall.cz/i/109739973', 'tlmice'),
(20, 'Suspension', 'Pružiny', 'https://cdn.pkwteile.de/thumb/assets/ersatz_categories/200x200/129.jpg', 'pruziny'),
(21, 'Suspension', 'Ramená', 'https://s13emagst.akamaized.net/products/42748/42747716/images/res_762842836bc14837e27e297abd0b8a37.jpg', 'ramena'),
(22, 'Suspension', 'Silentbloky', 'https://www.autodielygafa.sk/server/Uploads/DescriptionFiles/Blog/113/dc6uX7R.jpg', 'silentbloky'),
(23, 'Suspension', 'Čapy', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/64.jpg', 'capy'),
(24, 'Suspension', 'Stabilizátory', 'https://motone.cz/306945-large_default/tycka-stabilizatoru-renault-predni-megane-scenic-08-16-160600008.jpg', 'stabilizatory'),
(25, 'Clutch', 'Spojková sada', 'https://www.comco.sk/img/landing-spojky-spojkove-sady-zotrvacnik/spojkova-sada.jpg', 'spojkova_sada'),
(26, 'Clutch', 'Lamela', 'https://digital-assets.tecalliance.services/images/3200/09f91340e07281ab30d2e690007b1b64f17d220e.jpg', 'lamela'),
(27, 'Clutch', 'Prítlačný tanier', 'https://cdn.autoteileprofi.de/thumb/assets/prf/ersatz_categories/218.jpg', 'pritlacny_tanier'),
(28, 'Clutch', 'Zotrvačník', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/222.png', 'zotrvacnik'),
(29, 'Clutch', 'Spojkové ložisko', 'https://media.autoteiledirekt.de/360_photos/15799535/preview.jpg', 'spojkove_lozisko'),
(30, 'Clutch', 'Spojkový valček', 'https://vsautodiely.sk/wp-content/uploads/2020/06/1348734-1.jpg', 'spojkovy_valcek'),
(31, 'Exhaust', 'Koncový tlmič', 'https://www.autodielygafa.sk/server/Uploads/ProductPhotos/excel_RME10160_original_Tlumik-Koncowy-60mm-RM_[336110]_0c20274c9e34.jpg', 'koncovy_tlmic'),
(32, 'Exhaust', 'Stredový tlmič', 'https://www.comco.sk/files/tecdoc/polmo/7/_640x480/24-17.jpg', 'stredovy_tlmic'),
(33, 'Exhaust', 'Katalyzátor', 'https://race-shop.sk/362722-large_default/univerzalny-katalyzator-magnaflow-53005-euro-1-2-57mm.jpg', 'katalyzator'),
(34, 'Exhaust', 'Trúbky', 'https://www.tuningcardesign.cz/_obchody/tuningcardesign.web5.cz/prilohy/1666/nerezove-vyfukove-trubka-rovna-hjs-delka-100cm-x-p-1.jpg.big.jpg', 'trubky'),
(35, 'Exhaust', 'Spóny a lepidlá', 'https://www.auto-vyfuk.sk/content/images/thumbs/0094683_fa-114-943_300.png', 'spony_a_lepidla'),
(36, 'Exhaust', 'Tesnenia', 'https://www.tuningcardesign.sk/_obchody/tuningcardesign.web5.cz/prilohy/86/tesneni-na-vyfuk-76mm-2-srouby-0.jpg.big.jpg', 'tesnenia');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `parts`
--

CREATE TABLE `parts` (
  `id` int NOT NULL,
  `subcategory` varchar(255) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `engine` varchar(100) NOT NULL,
  `availability` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `code` varchar(6) NOT NULL,
  `compatible_codes` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `parts`
--

INSERT INTO `parts` (`id`, `subcategory`, `brand`, `category`, `engine`, `availability`, `price`, `description`, `code`, `compatible_codes`, `image`) VALUES
(1, 'Rozvodová sada', 'Bosch', 'Engine', '1.8 1996', 'Skladom', 250.00, 'Rozvodová sada - remeň, kladka, vodná pumpa', '000001', '6841532,6541657,2684686', 'https://www.mototech.sk/fotky28838/fotos/_vyr_2732BOSCH-1-987-948-959-rozvodova-sada-rozvody-03L198119D-03L198119A-1-2tdi-1-6tdi-2-0tdi.jpg'),
(2, 'Rozvodová sada', 'Continental', 'Engine', '1.8 1996', 'Skladom', 130.00, 'Rozvodová sada - remeň, napínacia kladka', '000019', '6841532,4898415,3134524', 'https://cdn.autoteiledirekt.de/thumb?id=1210398&m=0&n=0&lng=sk&rev=94077841'),
(3, 'Sviečky', 'NGK', 'Engine', '1.8 1996', 'Vypredané', 50.00, 'Zapalovacie sviečky', '000002', '9865133,9864513,1632353', 'https://image.motozem.sk/product/242048-2@1x.webp'),
(4, 'Sviečky', 'NGK', 'Engine', '1.8 1996', 'Skladom', 12.00, 'Zapalovacie sviečky', '000016', '1632353,8645136,9864513', 'https://image.motozem.sk/product/242048-2@1x.webp'),
(5, 'Sviečky', 'Bosch', 'Engine', '1.8 1996', 'Skladom', 15.00, 'Zapalovacie sviečky', '000021', '9864513,8461532,7645332', 'https://www.kupsito.sk/image/a.allegroimg.com/original/11304c/33f25f354c2c88bb05b10e17f3a1/4x-zapalovacia-sviecka-bosch-super-plus-1-wr-7-dc.jpg'),
(6, 'Sviečky', 'Denso', 'Engine', '1.8 1996', 'Na objednávku', 15.00, 'Zapalovacie sviečky', '000027', '9864513,1683458,3874613', 'https://all4moto.sk/11078-large_default/sviecka-denso-standard-.jpg'),
(7, 'Brzdové kotúče', 'Brembo', 'Brakes', '1.8 1996', 'Skladom', 150.00, 'Brzdové kotúče - vetrané, zadná náprava', '000003', '7485613,986513,7645132', 'https://media.autodoc.de/360_photos/15251183/preview.jpg'),
(8, 'Brzdové kotúče', 'ABS', 'Brakes', '1.8 1996', 'Skladom', 80.00, 'Brzdové kotúče - drážkované, predná náprava', '000012', '7485613,514265,5613533', 'https://www.comco.sk/files/td/a-b-s/5/_250x250/18405.webp'),
(9, 'Brzdové platničky', 'Brembo', 'Brakes', '1.8 1996', 'Skladom', 35.00, 'Brzdové platničky - predná náprava', '000013', '2165313,2351023,2351245', 'https://media.autodoc.de/360_photos/1661956/h-preview.jpg'),
(10, 'Pružiny', 'Bilstein', 'Suspension', '1.8 1996', 'Skladom', 120.00, 'Pružiny - predná náprava', '000004', '8946513,9865130,8651321', 'https://img-cdn.heureka.group/v1/93df3eaa-f094-4a3c-8109-71317a084273.jpg?width=2000&height=2000&fit=upsize'),
(11, 'Spojková sada', 'Sachs', 'Clutch', '1.8 1996', 'Vypredané', 200.00, 'Spojková sada - lamela, prítlačný tanier, spojkové ložisko', '000005', '9846153,9864531,8946153,8416532', 'https://media.autoteiledirekt.de/360_photos/786515/preview.jpg'),
(12, 'Katalyzátor', 'MagnaFlow', 'Exhaust', '1.8 1996', 'Skladom', 350.00, 'Katalyzátor', '000006', '3864531,4865133,4165333', 'https://www.sportovniautodoplnky.sk/imgcache/6/2/pp72317x-katalyzator-magnaflow-spun-euro-3-4_-1_-1_63161.jpg'),
(13, 'Servo pumpa', 'ZF', 'Steering', '1.8 1996', 'Skladom', 180.00, 'Servo pumpa', '000007', '12311863,10032335,20685130', 'https://cdn.autodoc.de/thumb?id=7585733&m=1&n=0&lng=sk&rev=94077843'),
(14, 'Olej a filtre', 'Mann Filter', 'Engine', '1.8 1996', 'Skladom', 15.00, 'Olejový filter', '000008', '7946132,9864351,9846513', 'https://cdn.autodoc.de/thumb?id=963668&m=1&n=0&lng=sk&rev=94077843'),
(15, 'Olej a filtre', 'Delphi', 'Engine', '1.8 1996', 'Skladom', 70.00, 'Palivový filter', '000022', '9864351,9864351,9864513', 'https://media.autodoc.de/360_photos/7788360/h-preview.jpg'),
(16, 'Olej a filtre', 'Bosch', 'Engine', '1.8 1996', 'Skladom', 20.00, 'Olejový filter', '000024', '98651310,9864351,9864513', 'https://www.olejcentrum.sk/fotky10576/fotos/_vyr_530912p7147.jpg'),
(17, 'Chladiaci systém', 'Mahle', 'Engine', '1.8 1996', 'Skladom', 50.00, 'Termostat - otváracia teplota: 90°C', '000009', '5256132,5123845,51358412', 'https://cdn.autodoc.de/thumb?id=7528776&m=0&n=0&lng=sk&rev=94077841'),
(18, 'Chladiaci systém', 'Mayle', 'Engine', '1.8 1996', 'Skladom', 60.00, 'Termostat - otváracia teplota: 80°C', '000017', '5653131,5351233,5256132', 'https://a.allegroimg.com/original/11115b/66887dcd411f976618f137a9f325/Termostat-pre-BMW-M47-57-88C-Vyrobca-dielov-Meyle'),
(19, 'Chladiaci systém', 'Febi', 'Engine', '1.8 1996', 'Skladom', 100.00, 'Vodná pumpa - lopatky: oceľové', '000020', '5116531,651222,5135164', 'https://media.autoteileprofi.de/360_photos/1883340/preview.jpg'),
(20, 'Chladiaci systém', 'Gates', 'Engine', '1.8 1996', 'Skladom', 45.00, 'Termostat - otváracia teplota: 90°C', '000023', '6512352,5465316,53265163', 'https://media.autodoc.de/360_photos/1238208/h-preview.jpg'),
(21, 'Chladiaci systém', 'Mahle', 'Engine', '1.8 1996', 'Na objednávku', 60.00, 'Termostat - otváracia teplota: 85°C', '000026', '5256132,5123845,51358412', 'https://cdn.autoteileprofi.de/thumb?id=7815193&m=1&n=0&lng=sk&ccf=94077841'),
(22, 'Snímače', 'Delphi', 'Engine', '1.8 1996', 'Skladom', 45.00, 'Snímač kľukového hriadela', '000010', '0650352,0655132,0323512', 'https://www.opl-shop.sk/fotky12436/fotos/_vyrn_10003SS11081.jpg'),
(23, 'Snímače', 'Delphi', 'Engine', '1.8 1996', 'Skladom', 25.00, 'Snímač vačkového hriadela', '000025', '0613203,0603456,0643121', 'https://scdn.autoteiledirekt.de/catalog/categories/500x500/470.png'),
(24, 'Remene', 'Gates', 'Engine', '1.8 1996', 'Skladom', 85.00, 'Remeň alternátora', '000011', '8846153,8516323,8651333', 'https://cdn.autodoc.de/thumb?id=781114&m=0&n=0&lng=sk&rev=94077834'),
(25, 'Remene', 'Continental', 'Engine', '1.8 1996', 'Skladom', 110.00, 'Rozvodový remeň', '000015', '8651333,9648513,9653216', 'https://www.kupsito.sk/image/a.allegroimg.com/s480/11e0d2/caa0b27941f191c464ff86a99219/rozvodovy-remen-pre-renault-duster-1-5-dci.jpg'),
(26, 'Hlavný brzdový valec', 'TRW', 'Brakes', '1.8 1996', 'Skladom', 150.00, 'Hlavný brzdový valec', '000014', '6544644,6513289,6453168', 'https://www.comco.sk/files/tecdoc/trw/9/_640x480/pmk574.jpg'),
(27, 'Hlavný brzdový valec', 'TRW', 'Brakes', '1.8 1996', 'Skladom', 150.00, 'Hlavný brzdový valec', '000018', '6544644,6513289,6845132', 'https://www.comco.sk/files/tecdoc/trw/3/_640x480/pmk482.jpg');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `ratings`
--

CREATE TABLE `ratings` (
  `id` int NOT NULL,
  `code` varchar(6) NOT NULL,
  `user_id` int NOT NULL,
  `value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `ratings`
--

INSERT INTO `ratings` (`id`, `code`, `user_id`, `value`) VALUES
(65, '000001', 23, 5),
(66, '000001', 24, 5),
(75, '000001', 21, 4),
(77, '000010', 21, 2);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `review` text NOT NULL,
  `user_id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_code` varchar(6) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `reviews`
--

INSERT INTO `reviews` (`id`, `review`, `user_id`, `date`, `product_code`, `username`) VALUES
(80, 'OK', 23, '2025-01-03 19:40:07', '000001', 'Peto'),
(82, 'Sada prišla bez tesnení', 24, '2025-01-03 19:40:44', '000001', 'Jozo'),
(84, 'Parádna sada', 21, '2025-01-28 14:38:03', '000001', 'Filip');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `picture_path` varchar(255) NOT NULL DEFAULT '/uploads/defaultProfilePicture.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `picture_path`) VALUES
(21, 'Filip', 'filipbaranek22@gmail.com', '$2a$08$g3FK3zqqLhjD1J735HaDl.sLDgSvYzRian8k13y9cUtkx5scG/OVW', 'admin', '/uploads/1738075454717-9367.jpg'),
(23, 'Peto', 'peto@gmail.com', '$2a$08$NWGC4DPkeax4TA/Tp.CMmOXZhFZy/Lah7SEdxLC3pVcDMEolOum56', 'user', '/uploads/defaultProfilePicture.png'),
(24, 'Jozo', 'jozo@gmail.com', '$2a$08$vcSwXVYIrSrcNoHfAQNBuugvDWSZvjsbyilrx2BtFzbGJI03ZM6Du', 'user', '/uploads/defaultProfilePicture.png');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexy pre tabuľku `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexy pre tabuľku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pre tabuľku `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pre tabuľku `parts`
--
ALTER TABLE `parts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pre tabuľku `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pre tabuľku `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT pre tabuľku `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Obmedzenie pre tabuľku `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
