API Netflix
Crear una API que consulte los datos de la Base de datos en Mongo "sample_mflix" las siguientes colecciones:
-"movies" (Múltiples resultados) - Filtrar por los siguientes campos: - year: Mínimo y máximo opcionales, es decir, un rango. - rating: Resultados que sean mayor o igual al rating seleccionado. - genres: Permite recibir uno solo o múltiples valores, con string separados por coma o por medio de un array (ej. "genres=Drama" o "genres=Drama,Comedy" o "genres=Drama&genres=Comedy"). - Implementar paginación - El usuario enviará la query page=<num_page> y tu aplicación deberá calcular el offset y enviarlo a mongo (si no envía la query el valor por defecto será 1). - El usuario enviará la query page_size=<pg_size> para definir el número de resultados a recibir por cada página (sin no envía la query el valor por defecto será 10). - El usuario enviará una de las siguientes opciones para ordenar por medio de la query "sort": - "title_asc": ordenar por el título de forma ascendente. - "title_desc": ordenar por el título de forma descendente. - "rating_asc": ordenar por el rating (imdb) de forma ascendente. - "rating_desc": ordenar por el rating (imdb) de forma descendente. - "year_asc": ordenar por el año de forma ascendente. - "year_desc": ordenar por el año de forma descendente.
Si no envía la query o si es diferente a las disponibles se selecciona la opción "title_asc" por defecto. - La api debe enviar solo los siguientes campos en las respuestas: - \_id - title - genres - year - imdb (solo la propiedad rating) - plot - poster
-"movies" (Un solo resultado) - Crear un endpoint para obtener la información completa de una sola película por medio del id (" /movies/<id_movie>") utilizando la función findOne de mongo.

Parte 2
Crear un método PUT para el endpoint /movies/<idMovie> que modifique los siguientes campos de una película validando que cumpla con el formato adecuado (todos son requeridos a menos que se mencione lo contrario):

- title (string)
- genres (Array de strings) (opcional, [] por defecto)
- cast (Array Strings)
- countries (Array Strings) (opcional, [] por defecto)
- released (Date)
- directors (Array Strings)
- rated (String) (opcional, "UNRATED" por defecto)
- awards (Object) (Opcional, undefined por defecto)
  - wins (number)
  - nominations (number)
  - text (string)
- year (number)
- plot (string)
- fullplot (string)
- type (string) (opcional, "movie" por defecto)
- poster (string) (opcional)

Parte 2.2
Crear un metodo PATCH para el endpoint "/movies/<idMovie>" que pueda realizar las siguientes operaciones:

- "updateTitle" -> se envía el nuevo título
- "addGenre" -> se envía el nuevo género que se va a insertar en formato string, no Array.
- "removeGenre" -> se envía el género que se va a eliminar
  En el body de la solicitud se envirá un objeto con las propiedades "op" y "value", "op" incluirá el nombre de la operación que se quiere realizar, y value el valor que corresponde, por ejemplo: { op: "addGenre", value: "Comedy" }

Parte 3
Crear un método POST en el endpoint "/users" para insertar un nuevo usuario (colección users). El método recibirá los siguientes campos a través de body:

- name (string)
- email (string, validar que es un email)
- password (string)
  Todos los campos son obligatorios, si alguno se ha omitido se deberá enviar un error.
  Como respuesta al cliente debes enviar el id del nuevo registro.
  Utiliza la librería "js-sha256" para encriptar el password que recibes con SHA-256, por ejemplo:

---

## npm install js-sha256

import {sha256} from "js-sha256";
sha256("my encrypted text");

---

Utiliza el método "insertOne" del driver de Node/MongoDB para insertar.
Crea un método DELETE en el endpoint "/users/<id_user>" para eliminar un usuario específico.
Enviar como respuesta una confirmación de que el usuario se ha eliminado, en caso contrario se debe mencionar que no se ha eliminado ningún registro.
Utiliza el método "deleteOne" del driver de Node/MongoDB para eliminarlo.

Parte 4:
Añadir más funcionalidades al PATCH (para ello será necesario utilizar operadores de mongo):
updateDate: Actualizar la fecha de "lastupdated" a la fecha actual del sistema
addNominations: Incrementar el número de nominaciones de la pelicula, segun el indicado (awards.nominations)
Añadir al find un nuevo query param llamado twoDirectors=true, que devuelva los resultados para aquellas películas que tengan 2 directores (aplicar la solución con operadores de mongo)

Parte 5
Crea un método GET en el endpoint "/moviesplus" en el que se hará una búsqueda del mismo modo que en /movies, pero en esta ocasión deberás utilizar la función aggregate. Todas las opciones como sort, limit, skip, etc, se deberán realizar dentro de los parámetros de la función aggregate, no por medio de los métodos del cursor. Además tendrás que devolver en el resultado las siguientes propiedades: - comments (todos los comentarios que corresponden a esa película de la colección "comments") - numComments (el número de comentarios que tiene la nueva propiedad comments)

Parte 5.2
Crea un método GET en el endpoint "/genres" que devuelva un array de todos los géneros que existan entre los documentos de movies en Mayúsculas. ej: ["DRAMA", "COMEDY",...], no deben repetirse los strings dentro del array.
No está permitido procesar información con código javascript, el resultado debe obtener únicamente utilizando la función aggregate de mongo y sus operadores.
