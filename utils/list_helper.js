const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) =>  {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let mostLikes = blogs[0].likes
    let favBlog = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes
            favBlog = blog
        }
    })

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: mostLikes
    }
    
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }