class Midleware {
  constructor() {}
// Change offsets by received page number from params
  async isPagination(req, res, next) {
    const page = req.params.page;
    const offset = (page - 1) * 25 || 0;
    req.offset = offset;
    next();
  }
}

const commentsMidleware = new Midleware();

module.exports = commentsMidleware;
