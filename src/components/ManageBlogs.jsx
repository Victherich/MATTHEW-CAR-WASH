
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig'; // Adjust path as needed
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';
import BlogForm from './BlogForm'; // Import the BlogForm component

// --- Light Theme Colors (Consistent with Admin Dashboard) ---
const adminThemeColors = {
  mainBackground: '#F5F7FA',       // Very light blue-gray for the overall dashboard
  cardBackground: '#FFFFFF',       // Pure white for card backgrounds
  cardBorder: '#E0E6ED',           // Soft light gray for borders
  mainText: '#333333',             // Soft dark gray for general text
  secondaryText: '#666666',         // Medium gray for secondary text
  accent: '#0CC1E0',               // A pleasant, not-too-bright blue for accents
  accentHover: '#3A7DCF',          // Darker blue for hover states
  danger: '#E74C3C',               // Red for delete actions
  dangerHover: '#C0392B',          // Darker red for delete hover
  headerColor: '#0CC1E0',          // Darker title color
};

// --- Styled Components ---

const PageContainer = styled.div`
  background-color: ${adminThemeColors.mainBackground};
  min-height: 100vh;
  padding: 3rem 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: ${adminThemeColors.mainText};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  color: ${adminThemeColors.headerColor};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const AddButton = styled.button`
  background-color: ${adminThemeColors.accent};
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${adminThemeColors.accentHover};
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogCard = styled.div`
  background-color: ${adminThemeColors.cardBackground};
  border: 1px solid ${adminThemeColors.cardBorder};
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px; /* Fixed height for consistency */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  background-color: ${adminThemeColors.cardBorder}; /* Placeholder background */
`;

const CardContent = styled.div`
  flex-grow: 1; /* Allows content to take available space */
`;

const CardTitle = styled.h3`
  color: ${adminThemeColors.mainText};
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const CardExcerpt = styled.p`
  color: ${adminThemeColors.secondaryText};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  /* Limit excerpt to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  gap: 0.8rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  background-color: ${(props) =>
    props.danger ? adminThemeColors.danger : adminThemeColors.accent};
  color: #ffffff;

  &:hover {
    background-color: ${(props) =>
      props.danger ? adminThemeColors.dangerHover : adminThemeColors.accentHover};
    transform: translateY(-1px);
  }
`;

const NoBlogsMessage = styled.p`
  text-align: center;
  grid-column: 1 / -1; /* Span across all columns */
  color: ${adminThemeColors.secondaryText};
  font-size: 1.1rem;
  padding: 2rem;
  background-color: ${adminThemeColors.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

// --- ManageBlogs Component ---

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // Holds blog data if editing

  const fetchBlogs = async () => {
    Swal.fire({
      title: 'Loading Blogs...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc')); // Order by creation date
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to JS Date if necessary
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
      }));
      setBlogs(data);
      Swal.close();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      Swal.fire('Error', 'Failed to fetch blogs.', 'error');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
    window.scrollTo(0, 0); // Scroll to top for form visibility
  };

  const handleDelete = async (blogId, blogTitle) => {
    Swal.fire({
      title: `Are you sure you want to delete "${blogTitle}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: adminThemeColors.danger,
      cancelButtonColor: adminThemeColors.secondaryText,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
        try {
          await deleteDoc(doc(db, 'blogs', blogId));
          Swal.fire(
            'Deleted!',
            `"${blogTitle}" has been deleted.`,
            'success'
          );
          fetchBlogs(); // Re-fetch blogs to update the list
        } catch (error) {
          console.error('Error deleting blog:', error);
          Swal.fire('Error', `Failed to delete "${blogTitle}".`, 'error');
        }
      }
    });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBlog(null); // Clear editing blog data
    fetchBlogs(); // Re-fetch blogs to ensure list is updated after save/cancel
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>{showForm ? (editingBlog ? 'Edit Blog Post' : 'Create New Blog') : 'Manage Blog Posts'}</Title>
        {!showForm && (
          <AddButton onClick={() => setShowForm(true)}>
            + Add New Blog
          </AddButton>
        )}
      </HeaderContainer>

      {showForm ? (
        <BlogForm initialData={editingBlog} onSave={handleFormClose} onCancel={handleFormClose} />
      ) : (
        <BlogGrid>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog.id}>
                {/* <CardImage src={blog.imageUrl || 'https://placehold.co/320x180/E0E6ED/4A5568?text=No+Image'} alt={blog.title || 'Blog Post'} /> */}
                <CardContent>
                  <CardTitle>{blog.title || 'Untitled Blog'}</CardTitle>
                  <CardExcerpt>{blog.excerpt || 'No excerpt provided.'}</CardExcerpt>
                </CardContent>
                <CardActions>
                  <ActionButton onClick={() => handleEdit(blog)}>Edit</ActionButton>
                  <ActionButton danger onClick={() => handleDelete(blog.id, blog.title)}>Delete</ActionButton>
                </CardActions>
              </BlogCard>
            ))
          ) : (
            <NoBlogsMessage>No blog posts found. Click "Add New Blog" to create one!</NoBlogsMessage>
          )}
        </BlogGrid>
      )}
    </PageContainer>
  );
};

export default ManageBlogs;