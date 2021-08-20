from .models import Post
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):

  author = serializers.StringRelatedField()
  timestamp = serializers.DateTimeField(format="%I:%M %p, %a %d %B %Y")

  class Meta:
    model = Post
    fields = ['id', 'author','name', 'time','table_for','menu','email','customisations', 'timestamp', ]

