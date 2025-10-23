


import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';

import blogbg from '../Images3/p11.jpg';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components with light mode and green theme
const greenPrimary = '#34D399';
const greenHover = '#059669';

const Container = styled.div`
  background: linear-gradient(90deg, #f0fdf4, #dcfce7);
  color: #1e293b;
  font-family: 'Arial', sans-serif;
  padding-bottom: 3rem;
  min-height: 100vh;
`;

const BlogHeroSection = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background-image: linear-gradient(180deg, rgba(240, 253, 244, 0.0), rgba(220, 252, 231, 0.95)), url(${blogbg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #1e293b;
  border-bottom: 1px solid #cbd5e1;
`;

const BlogHeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1s ease;
  padding: 100px 10px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const BlogHeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #475569;
  animation: ${fadeIn} 1.2s ease;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BlogContentSection = styled.div`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const BlogArticleCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  animation: ${fadeIn} 1s ease;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.25);
  }
`;

const ArticleImage = styled.img`
  width: calc(100% + 3rem);
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #e0e0e0;
`;

const ArticleTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #0CC1E0;
`;

const ArticleExcerpt = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #475569;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 0.9rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: ${greenPrimary};
  border: none;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: ${greenHover};
  }

  svg {
    margin-left: 0.8rem;
  }
`;

const NoBlogsMessage = styled.p`
  text-align: center;
  color: #475569;
  font-size: 1.1rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const MatthewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    Swal.fire({
      title: 'Loading Blog Posts...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      }));
      setBlogs(data);
      Swal.close();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      Swal.fire('Error', 'Could not load blog posts.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Container>
      <BlogHeroSection>
        <BlogHeroTitle>
          Tips & Stories from MACO
        </BlogHeroTitle>
        <BlogHeroSubtitle>
          Discover expert car care advice, cleaning hacks, and behind-the-scenes stories from your trusted team at MACO.
        </BlogHeroSubtitle>
      </BlogHeroSection>

      <BlogContentSection>
        {loading ? (
          <NoBlogsMessage>Loading blog posts...</NoBlogsMessage>
        ) : blogs.length > 0 ? (
          <ArticlesGrid>
            {blogs.map((article) => (
              <BlogArticleCard key={article.id}>
                {article.imageUrl && (
                  <ArticleImage src={article.imageUrl} alt={article.title || 'Blog Post'} />
                )}
                <ArticleTitle>{article.title || 'Untitled Blog'}</ArticleTitle>
                <ArticleExcerpt>{article.excerpt || 'No excerpt provided.'}</ArticleExcerpt>
                <ReadMoreLink to={`/blog/${article.id}`}>
                  Read More <FaArrowRight />
                </ReadMoreLink>
              </BlogArticleCard>
            ))}
          </ArticlesGrid>
        ) : (
          <NoBlogsMessage>No blog posts yet. Stay tuned!</NoBlogsMessage>
        )}
      </BlogContentSection>
    </Container>
  );
};

export default MatthewBlog;
