const router = require('express').Router();

router.get('/', (req, res) => {
  const test = ['1', '2', 'shceventeen-teen', '55'];
  res.json(test);
});
  

module.exports = router;