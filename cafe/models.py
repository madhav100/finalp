from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    name=models.TextField(max_length=25,default="")
    email = models.EmailField(default="")
    menu=models.TextField(max_length=250,default="")
    customisations=models.TextField(max_length=250,default="")
    table_for=models.TextField(default="")
    timestamp = models.DateTimeField(auto_now_add=True)
    time=models.TextField(default="01:56 AM")
   

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return '{author}: {email} {name} {time} {table_for} {customisations}  ({menu}) ({timestamp})'.format(
            author=self.author,
            name=self.name,
           table_for=self.table_for,
           email=self.email,
           time=self.time,
           customisations=self.customisations,
            menu=self.menu,
            timestamp=self.timestamp,
        )

RELATIONSHIP_FOLLOWING = 1
RELATIONSHIP_BLOCKED = 2
RELATIONSHIP_STATUSES = (
    (RELATIONSHIP_FOLLOWING, 'Following'),
    (RELATIONSHIP_BLOCKED, 'Blocked'),
)

class Relationship(models.Model):
    from_user = models.ForeignKey(User,
                                on_delete=models.CASCADE,
                                related_name='relationships_from')
                                
    to_user = models.ForeignKey(User,
                                on_delete=models.CASCADE,
                                related_name='relationships_to')

    status = models.IntegerField(choices=RELATIONSHIP_STATUSES)

    