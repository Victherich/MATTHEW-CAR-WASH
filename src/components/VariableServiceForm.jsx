


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';



// --- Light Theme Colors (Consistent with Admin Dashboard) ---
const adminThemeColors = {
  mainBackground: '#F5F7FA',
  cardBackground: '#FFFFFF',
  cardBorder: '#E0E6ED',
  mainText: '#333333',
  secondaryText: '#666666',
  accent: '#0CC1E0',
  accentHover: '#3A7DCF',
  cancelButtonBg: '#9DA6B2',
  cancelButtonHover: '#7F8C9A',
  inputBackground: '#F8FAFC',
  inputBorder: '#CBD5E1',
  inputFocusBorder: '#0CC1E0',
  inputTextColor: '#333333',
  inputPlaceholder: '#9DA6B2',
  danger: '#E74C3C', // Added for remove button
  dangerHover: '#C0392B', // Added for remove button hover
};

// --- Styled Components ---

const FormCard = styled.div`
  background-color: ${adminThemeColors.cardBackground};
  border: 1px solid ${adminThemeColors.cardBorder};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 0 auto;
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
  box-sizing: border-box;

  &:focus {
    border-color: ${adminThemeColors.inputFocusBorder};
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 148, 88, 0.2);
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

  &:disabled {
    background-color: ${adminThemeColors.cancelButtonBg};
    cursor: not-allowed;
    opacity: 0.7;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
  border-radius: 8px;
  object-fit: contain;
  border: 1px solid ${adminThemeColors.cardBorder};
`;

const AddPackageButton = styled.button`
  background-color: ${adminThemeColors.accent};
  color: #ffffff;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  width: fit-content; // To prevent it from stretching
  display: block; // Ensures it's on its own line if needed

  &:hover {
    background-color: ${adminThemeColors.accentHover};
  }

  &:disabled {
    background-color: ${adminThemeColors.cancelButtonBg};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const RemovePackageButton = styled.button`
  background-color: ${adminThemeColors.danger};
  color: #ffffff;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px; /* Space from inputs */

  &:hover {
    background-color: ${adminThemeColors.dangerHover};
  }
`;

const PackageInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px; // Space between package rows

  ${Input} {
    flex: 1; // Allow inputs to take available space
  }
`


const TextArea = styled.textarea` /* Added TextArea styled component */
  width: 100%;
  padding: 0.8rem;
  background-color: ${adminThemeColors.inputBackground};
  color: ${adminThemeColors.inputTextColor};
  border: 1px solid ${adminThemeColors.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px; /* Adjust as needed */
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    border-color: ${adminThemeColors.inputFocusBorder};
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 148, 88, 0.2);
  }

  &::placeholder {
    color: ${adminThemeColors.inputPlaceholder};
  }
`;


// ## ServiceForm Component Updates


const VariableServiceForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '', // NEW: Add description field to state
        imageUrl: '',
        packages: [{ name: '', price: '' }],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '', // NEW: Set initial description
                imageUrl: initialData.imageUrl || '',
                packages: initialData.packages && initialData.packages.length > 0
                    ? initialData.packages.map(pkg => ({
                        name: pkg.name || '',
                        price: pkg.price !== null ? String(pkg.price) : 'N/A'
                    }))
                    : [{ name: '', price: '' }],
            });
        } else {
            setFormData({
                title: '',
                description: '', // NEW: Clear description for new entry
                imageUrl: '',
                packages: [{ name: '', price: '' }],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePackageChange = (index, e) => {
        const { name, value } = e.target;
        const newPackages = [...formData.packages];
        newPackages[index] = { ...newPackages[index], [name]: value };
        setFormData((prevData) => ({ ...prevData, packages: newPackages }));
    };

    const addPackage = () => {
        setFormData((prevData) => ({
            ...prevData,
            packages: [...prevData.packages, { name: '', price: '' }],
        }));
    };

    const removePackage = (index) => {
        const newPackages = [...formData.packages];
        newPackages.splice(index, 1);
        setFormData((prevData) => ({ ...prevData, packages: newPackages }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        Swal.fire({
            title: 'Saving Service...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const packagesToSave = formData.packages
                .filter(pkg => pkg.name.trim() !== '')
                .map(pkg => {
                    let priceValue = null;
                    const trimmedPrice = pkg.price.trim();

                    if (trimmedPrice === 'N/A' || trimmedPrice === '') {
                        priceValue = null;
                    } else {
                        const parsedPrice = parseFloat(trimmedPrice);
                        priceValue = isNaN(parsedPrice) ? null : parsedPrice;
                    }
                    return {
                        name: pkg.name.trim(),
                        price: priceValue,
                    };
                });

            const serviceData = {
                title: formData.title,
                description: formData.description.trim(), // NEW: Add description to data saved
                imageUrl: formData.imageUrl,
                packages: packagesToSave,
            };

            if (initialData && initialData.id) {
                await updateDoc(doc(db, 'services2', initialData.id), {
                    ...serviceData,
                    updatedAt: serverTimestamp(),
                });
                Swal.fire('Updated!', 'Service updated successfully.', 'success');
            } else {
                await addDoc(collection(db, 'services2'), {
                    ...serviceData,
                    createdAt: serverTimestamp(),
                });
                Swal.fire('Created!', 'New service added successfully.', 'success');
            }
            onSave();
        } catch (error) {
            console.error('Error saving service:', error);
            Swal.fire('Error', `Failed to save service: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="serviceTitle">Service Title</Label>
                    <Input
                        id="serviceTitle"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Car Wash Packages"
                        required
                        disabled={loading}
                    />
                </FormGroup>

                {/* NEW: Description Field */}
                <FormGroup>
                    <Label htmlFor="serviceDescription">Service Description</Label>
                    <TextArea
                        id="serviceDescription"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide a brief description of this service."
                        disabled={loading}
                        rows="4" // You can adjust the number of rows for better sizing
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                        id="imageUrl"
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Paste a direct image URL (e.g., [https://example.com/image.jpg](https://example.com/image.jpg))"
                        disabled={loading}
                    />
                    {formData.imageUrl && (
                        <ImagePreview src={formData.imageUrl} alt="Service Image Preview" />
                    )}
                </FormGroup>

                <FormGroup>
                    <Label>Service Packages</Label>
                    {formData.packages.map((pkg, index) => (
                        <PackageInputRow key={index}>
                            <Input
                                type="text"
                                name="name"
                                value={pkg.name}
                                onChange={(e) => handlePackageChange(index, e)}
                                placeholder="Package Name (e.g., One-time wash)"
                                required
                                disabled={loading}
                            />
                            <Input
                                type="text"
                                name="price"
                                value={pkg.price}
                                onChange={(e) => handlePackageChange(index, e)}
                                placeholder="Price in AED (e.g., 15)"
                                disabled={loading}
                            />
                            {formData.packages.length > 1 && (
                                <RemovePackageButton
                                    type="button"
                                    onClick={() => removePackage(index)}
                                    disabled={loading}
                                >
                                    Remove
                                </RemovePackageButton>
                            )}
                        </PackageInputRow>
                    ))}
                    <AddPackageButton type="button" onClick={addPackage} disabled={loading}>
                        + Add Package
                    </AddPackageButton>
                </FormGroup>

                <FormActions>
                    <CancelButton type="button" onClick={onCancel} disabled={loading}>
                        Cancel
                    </CancelButton>
                    <SubmitButton type="submit" disabled={loading}>
                        {initialData ? 'Update Service' : 'Create Service'}
                    </SubmitButton>
                </FormActions>
            </form>
        </FormCard>
    );
};

export default VariableServiceForm;
