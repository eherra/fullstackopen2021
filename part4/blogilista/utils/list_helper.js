const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((acc, like) => like + acc)
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0;
    let maxLikedObject = blogs[0]

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > maxLikes) {
            maxLikes = blogs[i].likes
            maxLikedObject = blogs[i]
        }
    }

    return {
        title: maxLikedObject.title,
        author: maxLikedObject.author,
        likes: maxLikedObject.likes
      }
}

const mostBlogs = (blogs) => {
    let blogMap = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (blogMap.has(blogs[i].author)) {
            blogMap.set(blogs[i].author, blogMap.get(blogs[i].author) + 1)
        } else {
            blogMap.set(blogs[i].author, 1)
        }
    }
    const values = [...blogMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a)

    return {
        author: values[0],
        blogs: values[1]
    }
}

const mostLikes = (blogs) => {
    let blogMap = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (blogMap.has(blogs[i].author)) {
            blogMap.set(blogs[i].author, blogMap.get(blogs[i].author) + blogs[i].likes)
        } else {
            blogMap.set(blogs[i].author, blogs[i].likes)
        }
    }
    const values = [...blogMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a)

    return {
        author: values[0],
        likes: values[1]
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }