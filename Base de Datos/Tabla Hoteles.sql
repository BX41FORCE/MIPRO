CREATE TABLE hoteles (
	id_hotel SERIAL NOT NULL,
	nombre VARCHAR(100),
	the_geom VARCHAR (100),
	provincia VARCHAR (50),
	canton VARCHAR (50),
	parroquia VARCHAR (50),
	registro VARCHAR (50),
	fecha_apertura VARCHAR (20),
	actividad VARCHAR (50),
	clasificacion VARCHAR (50),
	categoria VARCHAR (50),
	tipo_organizacion VARCHAR (50),
	referencia VARCHAR (200),
	direccion VARCHAR (200),
	telefono VARCHAR (20),
	celular VARCHAR (20),
	email VARCHAR (200),
	web VARCHAR (100),
	estado VARCHAR (50),
	origen VARCHAR (50),
	hombres INTEGER,
	mujeres INTEGER,
	discapacitados INTEGER,
	total_empleados INTEGER,
	habitaciones INTEGER,
	camas INTEGER,
	dato INTEGER,
	plazas_camas INTEGER,
	mesas INTEGER,
	plazas_mesas INTEGER,
	vehiculo INTEGER,
	admin_zonal VARCHAR (50),
	sector_turistico VARCHAR (50),
	zona_turistica VARCHAR (20),
	preparados_conservas_de_pescado_y_de_otras_especies_acuaticas FLOAT,
	pescado_y_otros_productos_acuaticos_elaborados FLOAT,
	carne_productos_de_carne_subproductos FLOAT,
	tuberculos_vegetales_melones_y_frutas FLOAT,
	productos_de_panaderia FLOAT,
	bebidas_alcoholicas FLOAT,
	flores_y_capullos FLOAT,
	fideos_macarrones_y_otros_productos_farinaceos_similares FLOAT,
	productos_lacteos_elaborados FLOAT,
	cacao_elaborado_chocolate_y_productos_de_confiteria FLOAT,
	productos_de_cafe_elaborado FLOAT
);