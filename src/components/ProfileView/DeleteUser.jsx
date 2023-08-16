import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalHeader} from 'react-bootstrap';

export function DeleteUser({profile, setUser, token}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handelCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    fetch(
      `https://myflix-movies-app-3c39c5149294.herokuapp.com/users/${profile.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      setUser(null);
      navigate('/signup');
    });
    alert('Your Account was deleted succesfully');
  };

  return (
    <div>
      <>
        <Button variant="danger" onClick={handleShowModal}>
          Delete Profile
        </Button>
        <Modal show={showModal} onHide={handelCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handelCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
