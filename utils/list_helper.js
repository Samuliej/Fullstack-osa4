const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    console.log(blogs)
    console.log(blogs[0].likes)
    const reducer = (sum, blog) =>  {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}
  
  module.exports = {
    dummy, totalLikes
  }