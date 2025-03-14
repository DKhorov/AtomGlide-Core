
<h1 align="center">AtomGlide-Core</h1>
<h4 align="center">Verson 1.0</h4>

<h3 align="center">Виджеты</h3>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow.svg" alt="JavaScript">
  <img src="https://img.shields.io/badge/Node.js-v14+-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-blue.svg" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-5.x-brightgreen.svg" alt="MongoDB">
</p>

---

## О проекте

**AtomGlide-Core** — это проект, который предоставляет API для управления пользователями и постами. Проект использует современные технологии, такие как JavaScript (ES6+), Node.js, Express.js и MongoDB для обеспечения высокой производительности и удобства разработки.

Основные функции:
- Регистрация и авторизация пользователей.
- Создание, чтение, обновление и удаление постов.
- Загрузка изображений.
- Управление тегами постов.

---

## Методы в `index.js`

В файле `index.js` реализованы основные маршруты для работы с API. Ниже приведено описание каждого маршрута:

### 1. **`/auth/me`**
   - **Описание:** Возвращает информацию о текущем авторизованном пользователе.
   - **Метод:** `GET`
   - **Эндпоинт:** `/auth/me`
   - **Пример запроса:**
     ```bash
     curl -X GET http://localhost:4000/auth/me -H "Authorization: Bearer <token>"
     ```
   - **Ответ:**
     ```json
     {
       "_id": "12345",
       "email": "user@example.com",
       "fullName": "John Doe",
       "avatarUrl": "http://example.com/avatar.jpg"
     }
     ```

### 2. **`/posts/:id`**
   - **Описание:** Возвращает информацию о конкретном посте по его ID.
   - **Метод:** `GET`
   - **Эндпоинт:** `/posts/:id`
   - **Пример запроса:**
     ```bash
     curl -X GET http://localhost:4000/posts/12345
     ```
   - **Ответ:**
     ```json
     {
       "_id": "12345",
       "title": "Post Title",
       "text": "Post Content",
       "imageUrl": "http://example.com/image.jpg",
       "tags": ["tag1", "tag2"],
       "viewsCount": 10
     }
     ```

### 3. **`/posts`**
   - **Описание:** Возвращает список всех постов.
   - **Метод:** `GET`
   - **Эндпоинт:** `/posts`
   - **Пример запроса:**
     ```bash
     curl -X GET http://localhost:4000/posts
     ```
   - **Ответ:**
     ```json
     [
       {
         "_id": "12345",
         "title": "Post Title",
         "text": "Post Content",
         "imageUrl": "http://example.com/image.jpg",
         "tags": ["tag1", "tag2"],
         "viewsCount": 10
       }
     ]
     ```

### 4. **`/posts/tags`**
   - **Описание:** Возвращает список тегов из последних 5 постов.
   - **Метод:** `GET`
   - **Эндпоинт:** `/posts/tags`
   - **Пример запроса:**
     ```bash
     curl -X GET http://localhost:4000/posts/tags
     ```
   - **Ответ:**
     ```json
     ["tag1", "tag2"]
     ```

### 5. **`/posts/:id` (DELETE)**
   - **Описание:** Удаляет пост по его ID.
   - **Метод:** `DELETE`
   - **Эндпоинт:** `/posts/:id`
   - **Пример запроса:**
     ```bash
     curl -X DELETE http://localhost:4000/posts/12345 -H "Authorization: Bearer <token>"
     ```
   - **Ответ:**
     ```json
     {
       "message": "Статья удалена"
     }
     ```

### 6. **`/posts/:id` (PATCH)**
   - **Описание:** Обновляет информацию о посте по его ID.
   - **Метод:** `PATCH`
   - **Эндпоинт:** `/posts/:id`
   - **Пример запроса:**
     ```bash
     curl -X PATCH http://localhost:4000/posts/12345 -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title": "Updated Title"}'
     ```
   - **Ответ:**
     ```json
     {
       "message": "Статья изменена"
     }
     ```

### 7. **`/auth/login`**
   - **Описание:** Авторизация пользователя.
   - **Метод:** `POST`
   - **Эндпоинт:** `/auth/login`
   - **Пример запроса:**
     ```bash
     curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password"}'
     ```
   - **Ответ:**
     ```json
     {
       "user": {
         "_id": "12345",
         "email": "user@example.com",
         "fullName": "John Doe",
         "avatarUrl": "http://example.com/avatar.jpg"
       },
       "token": "jwt.token.here"
     }
     ```

### 8. **`/auth/register`**
   - **Описание:** Регистрация нового пользователя.
   - **Метод:** `POST`
   - **Эндпоинт:** `/auth/register`
   - **Пример запроса:**
     ```bash
     curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "password", "fullName": "John Doe"}'
     ```
   - **Ответ:**
     ```json
     {
       "user": {
         "_id": "12345",
         "email": "user@example.com",
         "fullName": "John Doe",
         "avatarUrl": "http://example.com/avatar.jpg"
       },
       "token": "jwt.token.here"
     }
     ```

### 9. **`/posts` (POST)**
   - **Описание:** Создание нового поста.
   - **Метод:** `POST`
   - **Эндпоинт:** `/posts`
   - **Пример запроса:**
     ```bash
     curl -X POST http://localhost:4000/posts -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title": "New Post", "text": "Post Content", "imageUrl": "http://example.com/image.jpg", "tags": ["tag1", "tag2"]}'
     ```
   - **Ответ:**
     ```json
     {
       "_id": "12345",
       "title": "New Post",
       "text": "Post Content",
       "imageUrl": "http://example.com/image.jpg",
       "tags": ["tag1", "tag2"],
       "user": "12345"
     }
     ```

### 10. **`/upload`**
   - **Описание:** Загрузка изображения.
   - **Метод:** `POST`
   - **Эндпоинт:** `/upload`
   - **Пример запроса:**
     ```bash
     curl -X POST http://localhost:4000/upload -H "Authorization: Bearer <token>" -F "image=@/path/to/image.jpg"
     ```
   - **Ответ:**
     ```json
     {
       "url": "/uploads/image.jpg"
     }
     ```

---

## Как правильно делать запросы

Для взаимодействия с API, убедитесь, что вы используете правильный метод HTTP (GET, POST, PUT, DELETE) и корректный эндпоинт. Все запросы, кроме GET, должны включать заголовок `Content-Type: application/json` и передавать данные в формате JSON. Для авторизованных запросов необходимо передавать токен в заголовке `Authorization: Bearer <token>`.

Пример запроса на создание поста:

```bash
curl -X POST http://localhost:4000/posts -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title": "New Post", "text": "Post Content", "imageUrl": "http://example.com/image.jpg", "tags": ["tag1", "tag2"]}'
```

---

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/DKhorov/AtomGlide-Core.git
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите сервер:
   ```bash
   npm start
   ```

---

## Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. в файле [LICENSE](LICENSE).

```


