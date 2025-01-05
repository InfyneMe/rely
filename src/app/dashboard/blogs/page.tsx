import React from 'react'

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  author: string;
}

const dummyData: BlogPost[] = [
  {
    id: 1,
    title: "How to Maintain Your Vehicle: A Complete Guide",
    date: "January 5, 2025",
    excerpt: "Learn the best tips and tricks for keeping your vehicle in top condition, from regular maintenance to advanced repairs.",
    author: "Bishal Deb"
  },
  {
    id: 2,
    title: "The Importance of Timely Vehicle Reminders",
    date: "January 3, 2025",
    excerpt: "Set reminders for your vehicle maintenance to avoid costly repairs. This guide will show you how to stay on top of your vehicle's health.",
    author: "Bishal Deb"
  },
  {
    id: 3,
    title: "Innovations in Vehicle Technology: What's Next?",
    date: "December 30, 2024",
    excerpt: "Explore the latest advancements in vehicle technology, including electric vehicles, self-driving cars, and AI-powered maintenance solutions.",
    author: "Bishal Deb"
  }
];

const BlogPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">Our Latest Blog Posts</h1>
        <p className="text-lg text-gray-600">Stay informed with the latest updates on vehicle maintenance, tips, and industry trends.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyData.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
            <img src={`https://via.placeholder.com/500x300?text=${post.title.split(' ')[0]}`} alt={post.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
              <p className="text-gray-500 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-600">
                <span>By {post.author}</span>
                <span className="mx-2">|</span>
                <span>{post.date}</span>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
