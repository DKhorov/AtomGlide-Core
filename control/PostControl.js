import PostModel from '../models/post.js'

export const tagsAll = async (req,res) =>{
    try {
        const posts = await PostModel.find().limit(5).exec();
        res.json(posts);

        const tags = posts .map((obj) => obj.tags).flat().slice(0,5);



    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(404).json({
            message: 'Не удалось получить статьи  ',
        });
    }
}


export const getAll = async (req,res) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);



    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(404).json({
            message: 'Не удалось получить статьи  ',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        // Используем await для findOneAndUpdate
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId }, // Условие поиска
            { $inc: { viewsCount: 1 } }, // Обновление
            { new: true } // Возвращаем обновленный документ
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json(updatedPost);

    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        // Используем await для findOneAndDelete
        const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json({ message: 'Статья удалена' });

    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(500).json({
            message: 'Не удалось удалить статью',
        });
    }
};


export const update = async (req, res) => {
    try {
        const postId= req.params.id;
        await PostModel.updateOne({
            _id: postId,
        },
    {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
    },);
    res.json({ message: 'Статья изменена' });


    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(500).json({
            message: 'Не удалось edit статью',
        });
    }
};


export const create = async (req, res) => {
    try {
        // Проверяем, что userId установлен
        if (!req.userId) {
            return res.status(401).json({
                message: 'Пользователь не авторизован',
            });
        }

        // Создаем документ
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        // Сохраняем документ в базе данных
        const post = await doc.save();
        res.json(post);

    } catch (err) {
        console.error(err); // Логируем ошибку для отладки
        return res.status(500).json({
            message: 'Не удалось создать пост',
        });
    }
}
