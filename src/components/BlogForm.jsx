
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig'; // Adjust path as needed
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

// --- Light Theme Colors (Consistent with Admin Dashboard) ---
const adminThemeColors = {
  mainBackground: '#F5F7FA',
  cardBackground: '#FFFFFF',
  cardBorder: '#E0E6ED',
  mainText: '#333333',
  secondaryText: '#666666',
  accent: ' #0CC1E0',
  accentHover: '#3A7DCF',
  cancelButtonBg: '#9DA6B2',
  cancelButtonHover: '#7F8C9A',
  inputBackground: '#F8FAFC',
  inputBorder: '#CBD5E1',
  inputFocusBorder: '#4A90E2',
  inputTextColor: '#333333',
  inputPlaceholder: '#9DA6B2',
};

// --- Styled Components ---

const FormCard = styled.div`
  background-color: ${adminThemeColors.cardBackground};
  border: 1px solid ${adminThemeColors.cardBorder};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 800px; /* Wider form for main article textarea */
  margin: 0 auto; /* Center the form */
  color: ${adminThemeColors.mainText};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: ${adminThemeColors.mainText};
  font-size: 1.05rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background-color: ${adminThemeColors.inputBackground};
  color: ${adminThemeColors.inputTextColor};
  border: 1px solid ${adminThemeColors.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box; /* Include padding in width */

  &:focus {
    border-color: ${adminThemeColors.inputFocusBorder};
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: ${adminThemeColors.inputPlaceholder};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  background-color: ${adminThemeColors.inputBackground};
  color: ${adminThemeColors.inputTextColor};
  border: 1px solid ${adminThemeColors.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 200px; /* Taller textarea for main article */
  resize: vertical; /* Allow vertical resizing */
  box-sizing: border-box;

  &:focus {
    border-color: ${adminThemeColors.inputFocusBorder};
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: ${adminThemeColors.inputPlaceholder};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.8rem;
    button {
      width: 100%;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: ${adminThemeColors.accent};
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${adminThemeColors.accentHover};
  }
`;

const CancelButton = styled.button`
  background-color: ${adminThemeColors.cancelButtonBg};
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${adminThemeColors.cancelButtonHover};
  }
`;

// --- BlogForm Component ---

const BlogForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    mainArticle: '',
    imageUrl: '', // New field for image URL
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        excerpt: initialData.excerpt || '',
        mainArticle: initialData.mainArticle || '',
        imageUrl: initialData.imageUrl || '',
      });
    } else {
      // Clear form for new entry if initialData is null
      setFormData({
        title: '',
        excerpt: '',
        mainArticle: '',
        imageUrl: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Saving Blog...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      if (initialData && initialData.id) {
        // Update existing blog
        await updateDoc(doc(db, 'blogs', initialData.id), {
          ...formData,
          updatedAt: serverTimestamp(), // Update timestamp
        });
        Swal.fire('Updated!', 'Blog post updated successfully.', 'success');
      } else {
        // Add new blog
        await addDoc(collection(db, 'blogs'), {
          ...formData,
          createdAt: serverTimestamp(), // Add creation timestamp
        });
        Swal.fire('Created!', 'New blog post added successfully.', 'success');
      }
      onSave(); // Call onSave to close form and refresh list
    } catch (error) {
      console.error('Error saving blog:', error);
      Swal.fire('Error', `Failed to save blog post: ${error.message}`, 'error');
    }
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="blogTitle">Title</Label>
          <Input
            id="blogTitle"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="blogExcerpt">Excerpt</Label>
          <TextArea
            id="blogExcerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter a short excerpt for the blog list"
            rows="3"
            required
          />
        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="blogImageUrl">Image URL</Label>
          <Input
            id="blogImageUrl"
            type="url" // Use type="url" for better validation
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter URL for blog cover image (optional)"
          />
        </FormGroup> */}

        <FormGroup>
          <Label htmlFor="blogMainArticle">Main Article Content</Label>
          <TextArea
            id="blogMainArticle"
            name="mainArticle"
            value={formData.mainArticle}
            onChange={handleChange}
            placeholder="Write the full content of your blog post here..."
            required
          />
        </FormGroup>

        <FormActions>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">{initialData ? 'Update Blog' : 'Create Blog'}</SubmitButton>
        </FormActions>
      </form>
    </FormCard>
  );
};

export default BlogForm;