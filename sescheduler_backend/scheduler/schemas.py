from ninja import Schema

class UserSchema(Schema):
    username: str

class CreateUserSchema(Schema):
    username: str
    password: str

class CourseSchema(Schema):
    id: int
    name: str

class CreateTaskSchema(Schema):
    user_id: int  # Include user_id in the schema
    course_id: int
    category: str
    description: str

class TaskSchema(Schema):
    id: int
    user_id: int  # Include user_id in the task schema
    course: CourseSchema 
    category: str
    description: str