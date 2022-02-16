const routes = ["professional", "patient", "appointment"];
let paths = {};

const examples = {
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
      professional: "12345-ES",
      patient: "12345678900",
      date: "2022-02-16T10:30Z",
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
        401: {
          description: "Unauthorized",
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
                [route]: examples[route],
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
                    professional: "12345-ES",
                    patient: "12345678900",
                    date: "2022-02-16T10:30Z",
                  },
                  {
                    professional: "56789-RJ",
                    patient: "12345678900",
                    date: "2022-02-21T08:30Z",
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
                    professional: "12345-ES",
                    patient: "12345678900",
                    date: "2022-02-16T10:30Z",
                  },
                  {
                    professional: "12345-ES",
                    patient: "12345678902",
                    date: "2022-02-17T11:30Z",
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
              properties: {
                message: {
                  type: "string",
                  example: "wait list size is: 2",
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

delete paths["/appointment"].get;

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
    },
  },
};
