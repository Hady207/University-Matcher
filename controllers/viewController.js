const University = require('../models/universityModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.home = catchAsync(async (req, res, next) => {
  let query;
  if (!req.user) {
    query = University.find({ ratingAverage: { $gte: 3 } })
      .sort('-createdAt')
      .limit(3);
  } else {
    query = await University.find({
      $or: [{ majors: req.user.major }, { programs: req.user.program }]
    });
  }
  const top3 = await query;

  // console.log(top3);
  res.render('home', { title: 'Home', url: '/', top3 });
});

exports.universities = catchAsync(async (req, res, next) => {
  const universities = await University.find({});
  res.render('universities', { title: 'Universities', universities });
});

exports.universityOne = catchAsync(async (req, res, next) => {
  const one = await University.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!one) {
    return next(new AppError('There is no one with that name.', 404));
  }

  res.render('universityOne', {
    title: `Hello ${one.name}`,
    university: one
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  res.render('signup', { title: 'sign up' });
});

exports.login = catchAsync(async (req, res, next) => {
  res.render('login', { title: 'login' });
});

exports.campus = catchAsync(async (req, res, next) => {
  const posts = await Post.find({}).sort('-createdAt');
  res.render('campus', { title: 'campus', posts });
});

exports.dashboard = catchAsync(async (req, res, next) => {
  const universities = await University.find({});
  const reviews = await Review.find({});
  const users = await User.find({});
  res.render('dashboard', { title: 'dashboard', universities, reviews, users });
});

exports.me = catchAsync(async (req, res, next) => {
  res.render('me');
});

exports.profile = catchAsync(async (req, res, next) => {
  const friend = await User.findById(req.params.id);
  res.render('friend', { title: 'Welcome', friend });
});

exports.chatbot = catchAsync(async (req, res, next) => {
  // gets the action intent
  const Intent = req.body.queryResult.action;

  // majors dialog intent
  if (Intent == 'majorsIntent') {
    const majors = req.body.queryResult.parameters.courses;
    const university = await University.find({ majors }).select('name');
    const unis = university.map(el => el.name);
    const word = unis.length > 1 ? 'universities' : 'university';
    const verb = word == 'universities' ? 'are' : 'is';
    res.json({
      fulfillmentText: `${word} that provide this major ${verb} ${unis}`
    });
  }

  // prices dialog intent
  if (Intent == 'priceIntent') {
    const price = req.body.queryResult.parameters.prices;
    const programs = req.body.queryResult.parameters.programs;

    if (price == 'expensive' && programs) {
      const university = await University.findOne({
        priceAverage: { $gte: 240 },
        programs
      });
      res.json({
        fulfillmentText: `The most expensive university that provide a ${programs} is ${university.name} with a rating of ${university.ratingAverage}/5`
      });
    } else if (price == 'cheap' && programs) {
      const university = await University.findOne({
        priceAverage: { $lte: 240 },
        programs
      });
      res.json({
        fulfillmentText: `The most expensive university that provide a ${programs} is ${university.name} with a rating of ${university.ratingAverage}/5`
      });
    } else if (price == 'expensive') {
      const university = await University.findOne({
        priceAverage: { $gte: 240 }
      });
      res.json({
        fulfillmentText: `The most expensive university is ${university.name} with a rating of ${university.ratingAverage}/5`
      });
    } else if (price == 'cheap') {
      const university = await University.findOne({
        priceAverage: { $lt: 240 }
      });
      res.json({
        fulfillmentText: `The cheapest university is ${university.name} with a rating of ${university.ratingAverage}/5`
      });
    }
  }

  // program dialog intent
  if (Intent == 'programIntent') {
    const programs = req.body.queryResult.parameters.programs;
    const university = await University.find({
      programs
    }).select('abbrv');
    if (!university) {
      res.json({
        fulfillmentText: `there is no universitiy with your specifications`
      });
    }
    const abbrvs = university.map(el => el.abbrv);
    const word = unis.length > 1 ? 'universities' : 'university';

    res.json({
      fulfillmentText: `you can find what you looking for in these ${word} ${abbrvs}`
    });
  }

  // descripe Intent
  if (Intent == 'descripeIntent') {
    const name = req.body.queryResult.parameters.uni_names;
    const universityOne = await University.findOne({ name });
    if (!universityOne) {
      res.json({
        fulfillmentText: `there is no universitiy with your specifications`
      });
    }
    res.json({
      fulfillmentText: `${universityOne.abbrv} has a rating average of ${universityOne.ratingAverage}/5, voted by ${universityOne.ratingQuantity} student,\n it provides the following courses in ${universityOne.majors}.
        and located at ${universityOne.address}. if you like to know more please visit the ${universityOne.name} page
        at ${req.protocol}://${req.hostname}.com/universities/${universityOne.slug}`
    });
  }

  // rate intent action
  if (Intent == 'ratesIntent') {
    const rate = req.body.queryResult.parameters.rates;
    const majors = req.body.queryResult.parameters.courses;
    const programs = req.body.queryResult.parameters.programs;

    if (rate == 'highest') {
      if (majors && programs) {
        const university = await University.findOne({
          ratingAverage: { $gt: 3.5 },
          majors,
          programs
        });
        if (!university) {
          res.json({
            fulfillmentText: `there is no universitiy with your specifications`
          });
        }
        res.json({
          fulfillmentText: `${university.name} provide ${majors} and it is rated by ${university.ratingAverage}/5 \n
          you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
        });
      } else if (majors || programs) {
        let university;
        let word = majors == undefined ? programs : majors;
        if (majors) {
          university = await University.findOne({
            ratingAverage: { $gt: 3.5 },
            majors
          });
        } else if (porgrams) {
          university = await University.findOne({
            ratingAverage: { $gt: 3.5 },
            programs
          });
        }
        if (!university) {
          res.json({
            fulfillmentText: `there is no universitiy with your specifications`
          });
        }
        res.json({
          fulfillmentText: `${university.name} provide ${word} and it is rated by ${university.ratingAverage}/5 \n
          you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
        });
      }
      const university = await University.findOne({
        ratingAverage: { $gt: 3.5 }
      });
      if (!university) {
        res.json({
          fulfillmentText: `there is no universitiy with your specifications`
        });
      }
      res.json({
        fulfillmentText: `${university.name} it is rated by ${university.ratingAverage}/5 \n
        you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
      });
    } else if (rate == 'medium') {
      if (majors && programs) {
        const university = await University.findOne({
          ratingAverage: { $eq: 3.5 },
          majors,
          programs
        });
        if (!university) {
          res.json({
            fulfillmentText: `there is no universitiy with your specifications`
          });
        }
        res.json({
          fulfillmentText: `${university.name} provide ${majors} and it is rated by ${university.ratingAverage}/5 \n
          you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
        });
      } else if (majors || programs) {
        let word = majors == undefined ? programs : majors;
        let university;
        if (majors) {
          university = await University.findOne({
            ratingAverage: { $eq: 3.5 },
            majors
          });
        } else if (programs) {
          university = await University.findOne({
            ratingAverage: { $eq: 3.5 },
            programs
          });
        }

        if (!university) {
          res.json({
            fulfillmentText: `there is no universitiy with your specifications`
          });
        }
        res.json({
          fulfillmentText: `${university.name} provide ${word} and it is rated by ${university.ratingAverage}/5 \n
          you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
        });
      }
      const university = await University.findOne({
        ratingAverage: { $eq: 3.5 }
      });
      if (!university) {
        res.json({
          fulfillmentText: `there is no universitiy with your specifications`
        });
      }
      res.json({
        fulfillmentText: `${university.name} it is rated by ${university.ratingAverage}/5 \n
        you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
      });
    } else if (rate == 'lowest') {
      if (majors && programs) {
        const university = await University.findOne({
          ratingAverage: { $lt: 3.5 },
          majors,
          programs
        });
        if (!university) {
          res.json({
            fulfillmentText: `there is no universitiy with your specifications`
          });
        }
        res.json({
          fulfillmentText: `${university.name} provide ${majors} and it is rated by ${university.ratingAverage}/5 \n
          you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
        });
      } else if (majors || programs) {
        let university;
        let word = majors == undefined ? programs : majors;
        if (majors) {
          university = await University.findOne({
            ratingAverage: { $lt: 3.5 },
            majors
          });
        } else if (programs) {
          university = await University.findOne({
            ratingAverage: { $lt: 3.5 },
            porgrams
          });
        }

        if (!university) {
          res.json({
            fulfillmentText: `there is no universitiy with your specifications`
          });
        }
        res.json({
          fulfillmentText: `${university.name} provide ${word} and it is rated by ${university.ratingAverage}/5 \n
          you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
        });
      }
      const university = await University.findOne({
        ratingAverage: { $lt: 3.5 }
      });
      if (!university) {
        res.json({
          fulfillmentText: `there is no universitiy with your specifications`
        });
      }
      res.json({
        fulfillmentText: `${university.name} it is rated by ${university.ratingAverage}/5 \n
        you can find more on this link ${req.protocol}://${req.hostname}.com/universities/${university.slug} `
      });
    }
  }
});
