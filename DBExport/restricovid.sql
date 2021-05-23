-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-04-2021 a las 16:56:00
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restricovid`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `poblaciones`
--

CREATE TABLE `poblaciones` (
  `ID` int(5) NOT NULL,
  `Poblacion` varchar(100) NOT NULL,
  `CP` int(10) NOT NULL,
  `Provincia` varchar(100) NOT NULL,
  `PosX` float DEFAULT NULL,
  `PosY` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `poblaciones`
--

INSERT INTO `poblaciones` (`ID`, `Poblacion`, `CP`, `Provincia`, `PosX`, `PosY`) VALUES
(1, 'Lezo', 20100, 'Guipuzcoa', 43.3263415, -1.8857695),
(2, 'Irun', 20301, 'Guipuzcoa', 43.3186405, -1.7737258),
(3, 'San Sebastian', 20001 , 'Guipuzcoa', 43.31283, -1.97499),
(4, 'Renteria', 20101, 'Guipuzcoa', 43.3166700, -2.4333300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restricciones`
--

CREATE TABLE `restricciones` (
  `ID` int(5) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `Descripcion` varchar(300) NOT NULL,
  `Abreviacion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restricciones`
--

INSERT INTO `restricciones` (`ID`, `Codigo`, `Descripcion`, `Abreviacion`) VALUES
(1, 'Res1', 'Restriccion1', 'Cierre petimetral'),
(2, 'Res2', 'Restriccion2', 'Hostelería Cerrada'),
(3, 'Res3', 'Restriccion3', 'Toque de queda desde las 22:00 hasta las 06:00'),
(4, 'Res4', 'Restriccion4', 'Se permiten grupos de 5 personas máximo en zonas públicas'),
(5, 'Res5', 'Restriccion5', 'No esta permitido fumar en zonas públicas'),
(6, 'Res6', 'Restriccion6', 'Confinamiento total, no se puede salir del domicilio de no ser estríctamente necesario');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `restriccionpoblacion`
--

CREATE TABLE `restriccionpoblacion` (
  `ID` int(11) NOT NULL,
  `Restriccion` int(11) NOT NULL,
  `Poblacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restriccionpoblacion`
--

INSERT INTO `restriccionpoblacion` (`ID`, `Restriccion`, `Poblacion`) VALUES
(1, 1, 3),
(2, 2, 1),
(4, 4, 1),
(6, 3, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `poblaciones`
--
ALTER TABLE `poblaciones`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `restricciones`
--
ALTER TABLE `restricciones`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `restriccionpoblacion`
--
ALTER TABLE `restriccionpoblacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_restriccion` (`Restriccion`) USING BTREE,
  ADD KEY `fk_poblacion` (`Poblacion`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `poblaciones`
--
ALTER TABLE `poblaciones`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `restricciones`
--
ALTER TABLE `restricciones`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `restriccionpoblacion`
--
ALTER TABLE `restriccionpoblacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `restriccionpoblacion`
--
ALTER TABLE `restriccionpoblacion`
  ADD CONSTRAINT `fk_poblacion` FOREIGN KEY (`Poblacion`) REFERENCES `poblaciones` (`ID`),
  ADD CONSTRAINT `fk_restriccion` FOREIGN KEY (`Restriccion`) REFERENCES `restricciones` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
