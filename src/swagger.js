const routes = ["professional", "patient", "appointment", "admin"];
let paths = {};

const examples = {
  professional: {
    value: {
      council_number: "12345-ES",
      email: "professional1@mail.com",
      password: "strongPassword",
      name: "Professional 1",
      phone: "98989797",
      specialty: "Pediatra",
      address: "Rua exemplo, 99",
    },
  },
  patient: {
    value: {
      cpf: "12345678900",
      email: "patient@mail.com",
      password: "strongPassword",
      name: "Patient 1",
      phone: "97979999",
      age: 25,
      sex: "Feminino",
      health_plan: "Unimed",
    },
  },
  appointment: {
    value: {
      professional: "12345-ES",
      patient: "12345678900",
      date: "2022-02-16T10:30Z",
    },
  },
  admin: {
    value: {
      name: "Admin",
      email: "admin@mail.com",
      password: "adminpass123",
    },
  },
  professionalUpdated: {
    value: {
      council_number: "12345-ES",
      email: "updated@mail.com",
      name: "Professional 1",
      phone: "98989797",
      specialty: "Pediatra",
      address: "Rua exemplo, 99",
    },
  },
  patientUpdated: {
    value: {
      cpf: "12345678900",
      email: "updated@mail.com",
      name: "Patient 1",
      phone: "97979999",
      age: 25,
      sex: "Feminino",
      health_plan: "Unimed",
    },
  },
  appointmentUpdated: {
    value: {
      id: "7896a8a0-eefa-43ff-9d9d-0913cfbc621d",
      professional: "12345-ES",
      patient: "12345678900",
      date: "2022-02-16T10:30Z",
      finished: true,
    },
  },
  adminUpdated: {
    value: {
      name: "Admin",
      email: "updated@mail.com",
      password: "adminpass123",
    },
  },
};
const examples2 = {
  professional: {
    value: {
      council_number: "56789-RJ",
      email: "professional2@mail.com",
      name: "Professional 2",
      phone: "91235678",
      specialty: "Psiquiatra",
      address: "Rua exemplo, 90",
    },
  },
  patient: {
    value: {
      cpf: "12345678902",
      email: "patient2@mail.com",
      name: "Patient 2",
      phone: "99991234",
      age: 23,
      sex: "Masculino",
      health_plan: "Unimed",
    },
  },
};

const responses = {
  professional: {
    value: {
      council_number: "12345-ES",
      email: "professional1@mail.com",
      name: "Professional 1",
      phone: "98989797",
      specialty: "Pediatra",
      address: "Rua exemplo, 99",
    },
  },
  patient: {
    value: {
      cpf: "12345678900",
      email: "patient@mail.com",
      name: "Patient 1",
      phone: "97979999",
      age: 25,
      sex: "Feminino",
      health_plan: "Unimed",
    },
  },
  appointment: {
    value: {
      id: "7896a8a0-eefa-43ff-9d9d-0913cfbc621d",
      professional: "12345-ES",
      patient: "12345678900",
      date: "2022-02-16T10:30Z",
      finished: false,
    },
  },
  admin: {
    value: {
      id: "8d056753-1840-493e-9ff0-08aeacb57c00",
      name: "Admin",
      email: "admin@mail.com",
      isAdm: true,
    },
  },
};

routes.forEach((route) => {
  paths["/" + route] = {
    post: {
      description: `Path to register a new ${route}`,
      tags: [route],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: `#/components/schemas/${route}`,
            },
            examples: {
              [route]: examples[route],
            },
          },
        },
      },
      responses: {
        400: {
          description: "Failed to register",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                $ref: `#/components/schemas/${route}`,
              },
              examples: {
                [route]: responses[route],
              },
            },
          },
        },
      },
    },
    get: {
      description: `List all ${route}s`,
      tags: [route],
      responses: {
        200: {
          description: `List of ${route}s`,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              examples: {
                [route]: {
                  value: [examples[route], examples2[route]],
                },
              },
            },
          },
        },
        400: {
          description: `Failed to get ${route}'s list`,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Path only allowed to Administrators",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Unauthorized",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  paths["/" + route + "/{id}"] = {
    patch: {
      description: `Update a ${route}`,
      tags: [route],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: `#/components/schemas/${route}`,
            },
            examples: {
              [route]: {
                value: {
                  email: "updated@mail.com",
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Unauthorized",
                  },
                },
              },
            },
          },
        },
        400: {
          description: `Failed to update ${route}`,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                $ref: `#/components/schemas/${route}`,
              },
              examples: {
                [route]: examples[route + "Updated"],
              },
            },
          },
        },
      },
    },
    delete: {
      description: `Deletes a ${route}`,
      tags: [route],
      responses: {
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Unauthorized",
                  },
                },
              },
            },
          },
        },
        400: {
          description: `Failed to delete ${route}`,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        204: {
          description: "No Content",
        },
      },
    },
  };
});

paths["/appointment/{id}"].patch.requestBody.content[
  "application/json"
].examples.appointment.value = {
  finished: true,
};
paths["/appointment/patient/{cpf}"] = {
  get: {
    description: `List all appointments for a specific patient`,
    tags: ["appointment"],
    responses: {
      200: {
        description: `List of appointments`,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/appointment",
            },
            examples: {
              appointment: {
                value: [
                  {
                    id: "6452829c-5ffb-4658-aa0e-4be80a96a84b",
                    date: "2022-02-18T15:35:00.000Z",
                    finished: true,
                    patient_name: "Patient 1",
                    professional: {
                      name: "Professional 1",
                      specialty: "Angiologista",
                      email: "prof1@mail.com",
                      council_number: "9999-ES",
                    },
                  },
                  {
                    id: "49deabc8-90cd-45f8-a743-889d4d00d5e8",
                    date: "2022-02-20T16:20:00.000Z",
                    finished: false,
                    patient_name: "Patient 1",
                    professional: {
                      name: "Professional 2",
                      specialty: "Cardiologista",
                      email: "prof2@mail.com",
                      council_number: "9888-ES",
                    },
                  },
                ],
              },
            },
          },
        },
      },
      400: {
        description: `Failed to get appointments list`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Path only allowed to Administrators",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Unauthorized",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/appointment/professional/{crm}"] = {
  get: {
    description: `List all appointments for a specific professional`,
    tags: ["appointment"],
    responses: {
      200: {
        description: `List of appointments`,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/appointment",
            },
            examples: {
              appointment: {
                value: [
                  {
                    id: "6452829c-5ffb-4658-aa0e-4be80a96a84b",
                    date: "2022-02-18T15:35:00.000Z",
                    finished: true,
                    professional_name: "Joao Carlos",
                    patient: {
                      name: "Patient 1",
                      age: 20,
                      sex: "Male",
                      health_plan: "Unimed",
                    },
                  },
                  {
                    id: "49deabc8-90cd-45f8-a743-889d4d00d5e8",
                    date: "2022-02-18T16:35:00.000Z",
                    finished: false,
                    professional_name: "Joao Carlos",
                    patient: {
                      name: "Patient 2",
                      age: 23,
                      sex: "Female",
                      health_plan: "Unimed",
                    },
                  },
                ],
              },
            },
          },
        },
      },
      400: {
        description: `Failed to get appointments list`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Path only allowed to Administrators",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Unauthorized",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/appointment/tomorrow"] = {
  get: {
    description: `List all appointments scheduled for the next day`,
    tags: ["appointment"],
    responses: {
      200: {
        description: `List of appointments`,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/appointment",
            },
            examples: {
              appointment: {
                value: [
                  {
                    professional: "12345-ES",
                    patient: "12345678900",
                    date: "2022-02-17T13:00Z",
                  },
                  {
                    professional: "12345-ES",
                    patient: "12345678902",
                    date: "2022-02-17T14:00Z",
                  },
                  {
                    professional: "56789-RJ",
                    patient: "12345678900",
                    date: "2022-02-17T15:00Z",
                  },
                ],
              },
            },
          },
        },
      },
      400: {
        description: `Failed to get appointments list`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Path only allowed to Administrators",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Unauthorized",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/appointment/wait_list/{crm}"] = {
  get: {
    description: `Return the wait list size for one professional`,
    tags: ["appointment"],
    responses: {
      200: {
        description: `Message with the size of the wait list`,
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
            examples: {
              appointment: {
                value: {
                  message: "The wait list for Joao Carlos is of 2 patients",
                  size: 2,
                  professional_email: "teste@mail.com",
                  appointments: [
                    {
                      id: "7896a8a0-eefa-43ff-9d9d-0913cfbc621d",
                      date: "2022-02-18T10:35:00.000Z",
                      patient: {
                        name: "Patient 1",
                        phone: "989891010",
                        email: "pat1@mail.com",
                      },
                    },
                    {
                      id: "9b7a24a1-fd61-4159-b33d-7d0963dec9ab",
                      date: "2022-02-17T11:35:00.000Z",
                      patient: {
                        name: "Patient 2",
                        phone: "999658080",
                        email: "pat2@mail.com",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      400: {
        description: `Failed to get appointments list`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Path only allowed to Administrators",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Unauthorized",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/login"] = {
  post: {
    description: `Log in the user and return a JWT`,
    tags: ["login"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
          examples: {
            login: {
              value: {
                email: "mail@mail.com",
                password: "password123",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: `Returns the token used for authentications on the app`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBtYWlsLmNvbSIsIm5hbWUiOiJBZG0iLCJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjQ1MTA1OTk3LCJleHAiOjE2NDUxOTIzOTd9.9PgMVvF2wWWNJ9HdxsFwKnOVz28Ad_rQ3eRSS9jlPPo",
                },
              },
            },
          },
        },
      },
      400: {
        description: `Failed to log in`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/send"] = {
  post: {
    description: `Log in the user and return a JWT`,
    tags: ["email"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
          examples: {
            login: {
              value: {
                email: "mail@mail.com",
                password: "password123",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: `Returns the token used for authentications on the app`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBtYWlsLmNvbSIsIm5hbWUiOiJBZG0iLCJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjQ1MTA1OTk3LCJleHAiOjE2NDUxOTIzOTd9.9PgMVvF2wWWNJ9HdxsFwKnOVz28Ad_rQ3eRSS9jlPPo",
                },
              },
            },
          },
        },
      },
      400: {
        description: `Failed to log in`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/send/prescription"] = {
  post: {
    description: `Log in the user and return a JWT`,
    tags: ["email"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
          examples: {
            login: {
              value: {
                email: "mail@mail.com",
                password: "password123",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: `Returns the token used for authentications on the app`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbUBtYWlsLmNvbSIsIm5hbWUiOiJBZG0iLCJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjQ1MTA1OTk3LCJleHAiOjE2NDUxOTIzOTd9.9PgMVvF2wWWNJ9HdxsFwKnOVz28Ad_rQ3eRSS9jlPPo",
                },
              },
            },
          },
        },
      },
      400: {
        description: `Failed to log in`,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
paths["/appointment"].post.responses[401] = {
  description: "Unauthorized",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Unauthorized",
          },
        },
      },
    },
  },
};

delete paths["/appointment"].get;
delete paths["/admin"].get;
delete paths["/admin/{id}"].delete;

const professionalComponent = {
  type: "object",
  properties: {
    council_number: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      description: "Hashed with BCrypt",
    },
    name: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    specialty: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
};
const patientComponent = {
  type: "object",
  properties: {
    cpf: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      description: "Hashed with BCrypt",
    },
    name: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    age: {
      type: "number",
    },
    sex: {
      type: "string",
    },
    health_plan: {
      type: "string",
    },
  },
};
const appointmentComponent = {
  type: "object",
  properties: {
    professional: {
      type: "string",
    },
    patient: {
      type: "string",
    },
    date: {
      type: "string",
    },
  },
};
const adminComponent = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
};

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Kenzie Doc",
    description: "App to manage clinics",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/docs",
      description: "local server",
    },
  ],
  paths: paths,
  components: {
    schemas: {
      professional: professionalComponent,
      patient: patientComponent,
      appointment: appointmentComponent,
      admin: adminComponent,
    },
  },
};
