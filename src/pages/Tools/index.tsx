import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { RiAddFill } from 'react-icons/ri';

import Modal, { ModalHandles } from '../../components/Modal';
import Tool, { ITool } from '../../components/Tool';
import Button from '../../components/Button';
import Checkbox, { CheckBoxHandles } from '../../components/Checkbox';
import Pagination, { PaginationData } from '../../components/Pagination';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import profileImg from '../../assets/profile.png';

import { Container, Search, Input, ToolsList } from './styles';

interface SearchFormData {
  search: string;
}

interface ToolFormData {
  title: string;
  link: string;
  description: string;
  tags: string;
}

const Tools: React.FC = () => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const searchFormRef = useRef<FormHandles>(null);
  const createToolFormRef = useRef<FormHandles>(null);
  const editToolFormRef = useRef<FormHandles>(null);
  const createToolModalRef = useRef<ModalHandles>(null);
  const editToolModalRef = useRef<ModalHandles>(null);
  const removeToolModalRef = useRef<ModalHandles>(null);
  const checkBoxRef = useRef<CheckBoxHandles>(null);

  const [currentTool, setCurrentTool] = useState<ITool>({} as ITool);
  const [tools, setTools] = useState<ITool[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    current_page: 0,
    total_pages: 0,
  });

  const handleEditTool = useCallback(
    async (data: ToolFormData) => {
      try {
        editToolFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Tool title is required'),
          link: Yup.string().required('Tool link is required'),
          description: Yup.string().required('Tool description is required'),
          tags: Yup.string().required('Tool tag are required'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.put(`/tools/${currentTool?.id}`, {
          ...data,
          tags: data.tags.split(' '),
        });

        addToast({
          type: 'success',
          title: 'This was a complete success!',
          description: 'Congratulations! Tool successfully updated.',
        });

        setTools(oldState =>
          oldState.map(tool =>
            tool.id === currentTool?.id ? response.data : tool,
          ),
        );

        editToolModalRef.current?.close();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          editToolFormRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'An error just happened!',
          description:
            err.response?.data.message ||
            'An error just happened during the request. Please try again.',
        });

        editToolModalRef.current?.close();
      }
    },
    [addToast, currentTool],
  );

  const handleRemoveTool = useCallback(async () => {
    try {
      await api.delete(`/tools/${currentTool?.id}`);

      addToast({
        type: 'success',
        title: 'This was a complete success!',
        description: 'Congratulations! Tool successfully deleted.',
      });

      setTools(oldState =>
        oldState.filter(tool => tool.id !== currentTool?.id),
      );

      removeToolModalRef.current?.close();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'An error just happened!',
        description:
          err.response?.data.message ||
          'An error just happened during the request. Please try again.',
      });

      removeToolModalRef.current?.close();
    }
  }, [currentTool, addToast]);

  const handleCreateTool = useCallback(
    async (data: ToolFormData) => {
      try {
        createToolFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Tool title is required'),
          link: Yup.string().required('Tool link is required'),
          description: Yup.string().required('Tool description is required'),
          tags: Yup.string().required('Tool tag are required'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/tools', {
          ...data,
          tags: data.tags.split(' '),
        });

        addToast({
          type: 'success',
          title: 'This was a complete success!',
          description: 'Congratulations! Tool successfully created.',
        });

        createToolModalRef.current?.close();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          createToolFormRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'An error just happened!',
          description:
            err.response?.data.message ||
            'An error just happened during the request. Please try again.',
        });

        createToolModalRef.current?.close();
      }
    },
    [addToast],
  );

  const handleFetchTools = useCallback(
    async (page: number, search?: string) => {
      try {
        let url: string;

        if (search) {
          url = `/tools?page=${page}&${
            checkBoxRef.current?.getValue() ? 'tag' : 'title'
          }=${search}`;
        } else {
          url = `/tools?page=${page}`;
        }

        const response = await api.get(url);

        setTools(response.data.tools);
        setPagination({
          current_page: response.data.current_page,
          total_pages: response.data.total_pages,
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'An error just happened!',
          description:
            err.response?.data.message ||
            'An error just happened during the request. Please try again.',
        });
      }
    },
    [addToast],
  );

  const handleSelectPage = useCallback(
    (page: number) => {
      handleFetchTools(page, searchFormRef.current?.getFieldValue('search'));
    },
    [handleFetchTools],
  );

  function handleSearchTools({ search }: SearchFormData) {
    handleFetchTools(1, search);
  }

  useEffect(() => {
    handleFetchTools(1);
  }, [handleFetchTools]);

  return (
    <>
      <Container>
        <div>
          <header>
            <div>
              <h1>VUTTR</h1>
              <h4>Very Useful Tools to Remember</h4>
            </div>
            <Link to="/profile">
              {`${user.name.split(' ')[0]} ${user.name.split(' ')[1]}`}
              <img src={profileImg} alt="Perfil" />
            </Link>
          </header>
          <Search>
            <Form ref={searchFormRef} onSubmit={handleSearchTools}>
              <Input name="search" placeholder="Search" icon="search" />
            </Form>
            <div>
              <Checkbox ref={checkBoxRef} name="searchInTag">
                Seach in tags only
              </Checkbox>
              <Button onClick={() => createToolModalRef.current?.open()}>
                <RiAddFill size={25} />
                Add
              </Button>
            </div>
          </Search>
          <ToolsList>
            {tools.map(tool => (
              <Tool
                key={tool.id}
                data={tool}
                handleEdit={() => {
                  setCurrentTool(tool);
                  editToolModalRef.current?.open();
                }}
                handleRemove={() => {
                  setCurrentTool(tool);
                  removeToolModalRef.current?.open();
                }}
              />
            ))}
          </ToolsList>
          {tools.length > 0 && (
            <Pagination data={pagination} handleGoToPage={handleSelectPage} />
          )}
        </div>
        <Modal ref={createToolModalRef} title="Add new tool">
          <Form ref={createToolFormRef} onSubmit={handleCreateTool}>
            <Input name="title" placeholder="Tool name" label="Tool name" />
            <Input name="link" placeholder="Tool link" label="Tool link" />
            <Input
              name="description"
              placeholder="Tool description"
              label="Tool description"
            />
            <Input name="tags" placeholder="Tags" label="Tags" />
            <div>
              <Button type="submit">Add tool</Button>
            </div>
          </Form>
        </Modal>
        <Modal ref={editToolModalRef} title="Edit tool" type="edit">
          <Form
            ref={editToolFormRef}
            onSubmit={handleEditTool}
            initialData={{
              ...currentTool,
              tags: currentTool.tags?.join(' '),
            }}
          >
            <Input name="title" placeholder="Tool name" label="Tool name" />
            <Input name="link" placeholder="Tool link" label="Tool link" />
            <Input
              name="description"
              placeholder="Tool description"
              label="Tool description"
            />
            <Input name="tags" placeholder="Tags" label="Tags" />
            <div>
              <Button type="submit">Edit tool</Button>
            </div>
          </Form>
        </Modal>
        <Modal ref={removeToolModalRef} title="Remove tool" type="remove">
          <p>
            Are you sure you want to remove <b>{currentTool?.title}</b>?
          </p>
          <footer>
            <Button
              buttonType="secondary"
              onClick={() => removeToolModalRef.current?.close()}
            >
              Cancel
            </Button>
            <Button onClick={handleRemoveTool}>Yes, remove</Button>
          </footer>
        </Modal>
      </Container>
    </>
  );
};

export default Tools;
