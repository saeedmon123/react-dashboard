from ninja import Router
from .models import User, Course, Task
from .schemas import UserSchema, CourseSchema, TaskSchema, CreateUserSchema, CreateTaskSchema
from typing import List

router = Router()

# Admin: List all users
@router.get("/users/", response=List[UserSchema])
def list_users(request):
    return User.objects.all()

# Admin: Create new user (no auth)
@router.post("/users/", response=UserSchema)
def create_new_user(request, payload: CreateUserSchema):
    # Check if the username already exists
    if User.objects.filter(username=payload.username).exists():
        return {"error": f"Username '{payload.username}' is already taken."}, 400
    
    # Create the new user if the username is unique
    user = User.objects.create(username=payload.username, password=payload.password)
    return user

# User: List courses
@router.get("/courses/", response=List[CourseSchema])
def list_courses(request):
    user_id = request.GET.get("user_id")
    user = User.objects.get(id=user_id)
    return Course.objects.filter(user=user)

# User: Create a course
@router.post("/courses/", response=CourseSchema)
def add_course(request, name: str, user_id: int):
    user = User.objects.get(id=user_id)
    course = Course.objects.create(user=user, name=name)
    return course
# List tasks for a specific user
@router.get("/tasks/", response=List[TaskSchema])
def list_tasks(request):
    user_id = request.GET.get("user_id")
    user = User.objects.get(id=user_id)
    tasks = Task.objects.filter(course__user=user).select_related('course')  # Select course data
    return tasks
# Create a task for a specific user
@router.post("/tasks/", response=TaskSchema)
def add_task(request, payload: CreateTaskSchema):
    user = User.objects.get(id=payload.user_id)  # Fetch the user by user_id
    course = Course.objects.get(id=payload.course_id, user=user)  # Ensure the course belongs to the user
    task = Task.objects.create(
        user=user,
        course=course,
        category=payload.category,
        description=payload.description
    )
    return task

# Update a task for a specific user
@router.put("/tasks/{task_id}/", response=TaskSchema)
def update_task(request, task_id: int, payload: CreateTaskSchema):
    task = Task.objects.get(id=task_id)
    if task.user.id != payload.user_id:
        return {"error": "You are not authorized to update this task."}, 403
    task.category = payload.category
    task.description = payload.description
    task.save()
    return task

# Delete a task for a specific user
@router.delete("/tasks/{task_id}/")
def delete_task(request, task_id: int):
    task = Task.objects.get(id=task_id)
    task.delete()
    return {"success": True}

from ninja.errors import ValidationError
@router.post("/login/")
def login_user(request, username: str, password: str):
    if not username or not password:
        raise ValidationError([("username", "Username and password are required")])
    
    # Handle admin login
    if username == 'admin' and password == 'admin123':
        return {"id": 0, "username": "admin", "is_admin": True}

    # Handle regular user login
    try:
        user = User.objects.get(username=username)
        if user.password == password:
            return {"id": user.id, "username": user.username, "is_admin": False}
        else:
            return {"error": "Invalid username or password."}, 400
    except User.DoesNotExist:
        return {"error": "Invalid username or password."}, 400
