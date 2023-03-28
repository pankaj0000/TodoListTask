import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import { errors, labels } from "../dictionary";
import axios from "axios";
import AllTask from "./AllTask";

const url = "http://localhost:8000/tasks";

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [viewAllTask, setViewAllTask] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [isEditActive, setIsEditActive] = useState(false);
  const [id, setId] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      title: title,
      description: description,
      status: status,
    };
    if (!isEditActive) {
      const checkTitle = await checkIfTitleAlreadyExist();
      if (!checkTitle) {
        axios
          .post(url, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const { status } = response;
            if (status === 201) {
              toast.success(labels.successTask);
              resetAllFields();
              prepareAllTasksData();
            }
          })
          .catch((err) => {
            toast.error(errors.common);
            console.log("Error in creating task", err);
          });
      }
    } else {
      editData(payload);
    }
  }

  function checkIfTitleAlreadyExist() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}?title=${title}`)
        .then((response) => {
          const { data } = response;
          if (data?.length > 0) {
            toast.error(errors.duplicateTitle);
          } else {
            return resolve(false);
          }
        })
        .catch((err) => {
          toast.error(errors.common);
          console.log("Error in getting task data", err);
          return reject(err);
        });
    });
  }

  function prepareAllTasksData() {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (Array.isArray(data) && data.length > 0) {
          setAllTasks(data);
        } else {
          setAllTasks([]);
        }
      })
      .catch((err) => {
        console.log("Error in getting all task data", err);
      });
  }

  async function editData(payload) {
    try {
      const checkTitle = await checkIfTitleAlreadyExist();
      if (!checkTitle) {
        axios
          .put(`${url}/${id}`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const { status, data } = response;
            console.log("Status", status, data);
            resetAllFields();
            toast.success("Data updated succesfully!");
            setIsEditActive(false);
            prepareAllTasksData();
          })
          .catch((err) => {
            toast.error(errors.common);
            console.log("Error in editing data", err);
          });
      }
    } catch (error) {
      toast.error(errors.common);
      console.log("Error in editing data", error);
    }
  }

  function handleDeletePress(row) {
    axios
      .delete(`${url}/${row.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Deleted successfully");
        prepareAllTasksData();
      })
      .catch((err) => {
        toast.error(errors.common);
        console.log("Error in deleting from db", err);
      });
  }
  function handleEditPress(row) {
    setId(row?.id);
    setTitle(row?.title);
    setDescription(row?.description);
    setStatus(row?.status);
    setIsEditActive(true);
    setViewAllTask(false);
  }

  function resetAllFields() {
    setTitle("");
    setDescription("");
    setStatus("");
    setId(null);
  }

  useEffect(() => {
    prepareAllTasksData();
  }, []);

  return (
    <Layout>
      {viewAllTask ? (
        <AllTask
          data={allTasks}
          handleEditPress={handleEditPress}
          handleDeletePress={handleDeletePress}
          handleBackPress={setViewAllTask}
        />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {labels.tasks}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required={true}
                fullWidth={true}
                id="task_name"
                label="Title"
                name="task_name"
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth={true}
                name="task_description"
                label="Description"
                id="task_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                required={true}
                fullWidth={true}
                name="task_status"
                label="Status"
                id="task_status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isEditActive ? labels.save : labels.createTasks}
              </Button>
              {isEditActive ? (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    resetAllFields();
                    setIsEditActive(false);
                  }}
                >
                  {labels.cancel}
                </Button>
              ) : (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => setViewAllTask(true)}
                >
                  {labels.allTask}
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      )}
    </Layout>
  );
}
