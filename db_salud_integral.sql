-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 07, 2020 at 12:27 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_salud_integral`
--

-- --------------------------------------------------------

--
-- Table structure for table `antecedentes_familiares`
--

CREATE TABLE `antecedentes_familiares` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `antecedentes_familiares`
--

INSERT INTO `antecedentes_familiares` (`id`, `nombre`) VALUES
(1, 'Ninguna'),
(2, 'Padre/Madre diabético'),
(3, 'Padre/Madre hipertenso'),
(4, 'Padre/Madre con cáncer'),
(5, 'Tíos/Abuelos diabético'),
(6, 'Tíos/Abuelos hipertenso'),
(7, 'Tíos/Abuelos con cáncer');

-- --------------------------------------------------------

--
-- Table structure for table `antecedentes_patologicos`
--

CREATE TABLE `antecedentes_patologicos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `antecedentes_patologicos`
--

INSERT INTO `antecedentes_patologicos` (`id`, `nombre`) VALUES
(1, ''),
(2, ''),
(3, ''),
(4, ''),
(5, ''),
(6, '');

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `nombre`) VALUES
(1, 'ENE'),
(2, 'ELE'),
(3, 'IND'),
(4, 'ISEI'),
(5, 'IMA'),
(6, 'MTR'),
(7, 'LNA'),
(8, 'MC'),
(9, 'MCI'),
(10, 'Personal Academia'),
(11, 'Personal Administrativo'),
(12, 'Personal Externo');

-- --------------------------------------------------------

--
-- Table structure for table `calisficaciones_enfermedades`
--

CREATE TABLE `calisficaciones_enfermedades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `calisficaciones_enfermedades`
--

INSERT INTO `calisficaciones_enfermedades` (`id`, `nombre`) VALUES
(1, 'Enfermedad infecciosa y parasitaria'),
(2, 'Enfermedades del sistema respiratorio'),
(3, 'Enfermedades del sistema digestivo'),
(4, 'Enfermedades o traumatismo en el sistema musculoesquelético y del tejido conectivo'),
(5, 'Enfermedades del sistema circulatorio'),
(6, 'Enfermedades de la sangre, órganos hematopoyéticos y trastornos del mecanismo inmune'),
(7, 'Enfermedades endócrinas, nutricionales y metabólicas'),
(8, 'Enfermedades del sistema nervioso'),
(9, 'Enfermedades del ojo y anexos'),
(10, 'Enfermedades del oído y procesos mastoideos'),
(11, 'Enfermedades de la piel y tejido subcutaneo'),
(12, 'Enfermedades del sistema génitourinario'),
(13, 'Embarazo, parto y puerperio'),
(14, 'Trastornos mentales y del comportamiento'),
(15, 'Neoplasias'),
(16, 'Síntomas, signos y hallazgos clínicos y de laboratorio anormales no clasificados en otra parte');

-- --------------------------------------------------------

--
-- Table structure for table `formularios_atencion_nutrimental`
--

CREATE TABLE `formularios_atencion_nutrimental` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `talla` varchar(45) NOT NULL,
  `peso` varchar(45) NOT NULL,
  `imc` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formularios_atencion_nutrimental`
--

INSERT INTO `formularios_atencion_nutrimental` (`id`, `usuario_id`, `talla`, `peso`, `imc`) VALUES
(1, 1, '1.60', '55', '21.28'),
(2, 1, '1.65', '65', '22.2'),
(3, 1, '1.5', '50', '22.22222222222222'),
(4, 1, '1.68', '56', '19.841269841269845'),
(5, 1, '1.48', '52', '23.739956172388606'),
(6, 1, '1.5', '50', '22.22222222222222'),
(7, 1, '1.64', '60', '22.308149910767405');

-- --------------------------------------------------------

--
-- Table structure for table `formularios_justificaciones`
--

CREATE TABLE `formularios_justificaciones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `cuatrimestre` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `clasificacion_enfermedad_id` int(11) NOT NULL,
  `descripcion_enfermedad` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `formularios_salud_preventiva`
--

CREATE TABLE `formularios_salud_preventiva` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `responsable_llenado_id` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `peso` varchar(45) NOT NULL,
  `talla` varchar(45) NOT NULL,
  `grupo_sanguineo_id` int(11) NOT NULL,
  `fuma` int(11) NOT NULL,
  `bebidas_alcoholicas` int(11) NOT NULL,
  `otra_sustancia` varchar(45) DEFAULT NULL,
  `uso_lentes` int(11) NOT NULL,
  `numero_embarazos` int(11) NOT NULL,
  `actividad_fisica` int(11) NOT NULL,
  `antecedentes_patologicos` varchar(45) NOT NULL,
  `antecedentes_familiares` varchar(45) NOT NULL,
  `metodos_anticonceptivos` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `grupos_sanguineos`
--

CREATE TABLE `grupos_sanguineos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grupos_sanguineos`
--

INSERT INTO `grupos_sanguineos` (`id`, `nombre`) VALUES
(1, 'A+'),
(2, 'A-'),
(3, 'O+'),
(4, 'O-'),
(5, 'AB+'),
(6, 'AB-');

-- --------------------------------------------------------

--
-- Table structure for table `metodos_anticonceptivos`
--

CREATE TABLE `metodos_anticonceptivos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `metodos_anticonceptivos`
--

INSERT INTO `metodos_anticonceptivos` (`id`, `nombre`) VALUES
(1, 'Ninguno'),
(2, 'Preservativo'),
(3, 'DIU'),
(4, 'Pastillas'),
(5, 'Parche'),
(6, 'Implante'),
(7, 'Inyectable');

-- --------------------------------------------------------

--
-- Table structure for table `responsables_llenado`
--

CREATE TABLE `responsables_llenado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `responsables_llenado`
--

INSERT INTO `responsables_llenado` (`id`, `nombre`) VALUES
(1, 'Angélica López'),
(2, 'Yolanda Saucedo'),
(3, 'PREVENIMSS');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `matricula` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido_paterno` varchar(45) NOT NULL,
  `apellido_materno` varchar(45) NOT NULL,
  `area_id` int(11) NOT NULL,
  `imss` varchar(45) NOT NULL,
  `sexo` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `matricula`, `nombre`, `apellido_paterno`, `apellido_materno`, `area_id`, `imss`, `sexo`) VALUES
(1, 160516, 'Ester', 'Uscanga', 'Olea', 4, '51058823983', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antecedentes_familiares`
--
ALTER TABLE `antecedentes_familiares`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `antecedentes_patologicos`
--
ALTER TABLE `antecedentes_patologicos`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `calisficaciones_enfermedades`
--
ALTER TABLE `calisficaciones_enfermedades`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `formularios_atencion_nutrimental`
--
ALTER TABLE `formularios_atencion_nutrimental`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `formularios_justificaciones`
--
ALTER TABLE `formularios_justificaciones`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `formularios_salud_preventiva`
--
ALTER TABLE `formularios_salud_preventiva`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `grupos_sanguineos`
--
ALTER TABLE `grupos_sanguineos`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `metodos_anticonceptivos`
--
ALTER TABLE `metodos_anticonceptivos`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `responsables_llenado`
--
ALTER TABLE `responsables_llenado`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `antecedentes_familiares`
--
ALTER TABLE `antecedentes_familiares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `antecedentes_patologicos`
--
ALTER TABLE `antecedentes_patologicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `calisficaciones_enfermedades`
--
ALTER TABLE `calisficaciones_enfermedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `formularios_atencion_nutrimental`
--
ALTER TABLE `formularios_atencion_nutrimental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `formularios_justificaciones`
--
ALTER TABLE `formularios_justificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `formularios_salud_preventiva`
--
ALTER TABLE `formularios_salud_preventiva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grupos_sanguineos`
--
ALTER TABLE `grupos_sanguineos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `metodos_anticonceptivos`
--
ALTER TABLE `metodos_anticonceptivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `responsables_llenado`
--
ALTER TABLE `responsables_llenado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
