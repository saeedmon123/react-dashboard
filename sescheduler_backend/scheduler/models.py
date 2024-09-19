from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Course(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.name


class Task(models.Model):
    category_choices = [
        ('assignments', 'Assignments'),
        ('exam_dates', 'Exam Dates'),
        ('study_goals', 'Study Goals'),
    ]
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Add user foreign key
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='tasks')
    category = models.CharField(max_length=50, choices=category_choices)
    description = models.TextField()

    def __str__(self):
        return f"{self.course.name} - {self.category}"
