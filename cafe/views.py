
from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import  HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json

from .models import User, Post
from .serializers import PostSerializer

def index(request):
    return render(request, "cafe/display.html")


def display(request):
    return render(request,"cafe/index.html")

def track(request):
    return render(request, "cafe/track.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "cafe/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "cafe/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "cafe/register.html", {
                "message": "Passwords do not match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "cafe/register.html", {
                "message": "This username already exists."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "cafe/register.html")

###########################functions start here###################################


def profile(request, username):
    user = User.objects.get(username=username)
    

    response = {
        'username' : user.username,
        }
    return JsonResponse(response, status=200)

def posts(request):
    page_num = int(request.GET.get("page"))
    num_of_posts = int(request.GET.get("perPage"))
    user = request.GET.get("user") or None
    feed = request.GET.get("feed") or None

    # if feed flag is raised, get posts of users request.user is following
        

    # if user flag is raised, get posts by a specific user
    if user:
        user_obj = User.objects.get(username=user)
        posts = Post.objects.filter(author=user_obj)  

    # else get all posts
    else:
        posts = Post.objects.all()
    

    # handle pagination and serialize posts
    paginator = Paginator(posts, num_of_posts)
    page = paginator.get_page(page_num)
    serializer = PostSerializer(page, many=True)

    response = {
        "requested_by" : request.user.username,
        "page" : page_num,
        "page_count" : paginator.num_pages,
        "has_next_page" : page.has_next(),
        "has_previous_page" : page.has_previous(),
        "posts" : serializer.data,
    }
    return JsonResponse(response, status=200)
def submit(request):
    if request.method != "POST":
        return render(request, "index.html")  

    # Add new post to DB
    data = json.loads(request.body)
    post = Post(author=request.user, time=data['time'], table_for=data['table_for'] ,name=data['name'], menu=data['menu'],email=data['email'],customisations=data['customisations'])
    post.save()
    serializer = PostSerializer(post)

    # Respond with the new post in JSON
    return JsonResponse(serializer.data, status=200)


    
    