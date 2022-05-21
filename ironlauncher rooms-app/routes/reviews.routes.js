const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/auth.middlewares');
const Review = require('../models/review.model');

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.render('reviews/reviews-list', { reviews, isLoggedIn: req.session.currentUser });
  } catch (error) {
    next(error);
  }
})

router.get('/json-list', async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
})


router.get('/create', (req, res, next) => {
  res.render('reviews/reviews-create');
})

router.post('/create', async (req, res, next) => {
  try {
    const { user, comment } = req.body;
    await Review.create({
      user,
      comment
    });

    res.redirect('/reviews');
  } catch (error) {
    next(error);
  }
})

router.get('/:id/edit', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.render('reviews/reviews-edit', review);
  } catch (error) {
    next(error);
  }
})

router.post('/:id/edit', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user, comment } = req.body;
    await Review.findByIdAndUpdate(id,
      {
        user,
        comment
      },

      {
        new: true
      });
    
      res.redirect(`/reviews/${id}`);
  } catch (error) {
    next(error);
  }
})

router.post('/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);

    res.redirect('/reviews');
  } catch (error) {
    next(error);
  }
})

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.render('reviews/review-details', review);
  } catch (error) {
    next(error);
  }
})

module.exports = router;

