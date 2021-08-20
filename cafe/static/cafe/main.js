import { headers, cookie } from './cookie.js';
import { load_post, load_profile } from './side.js';

let page_num = 1;
const num_of_posts = 3;
let this_view = 'index';


const csrftoken = cookie('csrftoken');

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#index-nav-link').addEventListener('click', () => load_view('index'));
    document.querySelector('#btn-next-page').addEventListener('click', next_pg);
    document.querySelector('#btn-previous-page').addEventListener('click', previous_pg);



    if (document.querySelector('#following-nav-link')) {
        document.querySelector('#following-nav-link').addEventListener('click', () => load_view('feed'));
    }

    const post_form = document.querySelector('#post-form')
    if (post_form) {
        post_form.addEventListener('submit', submit);
    }
    load_view('index');
})


function previous_pg() {
    page_num--;
    load_posts(this_view, page_num, num_of_posts);
}

function next_pg() {
    page_num++;
    load_posts(this_view, page_num, num_of_posts);
}


function update_posts_postion(data) {
    document.querySelector('#btn-next-page').style.display =
        data["has_next_page"] ? "block" : "none";

    document.querySelector('#btn-previous-page').style.display =
        data["has_previous_page"] ? "block" : "none";

    document.querySelector('#page-number').innerHTML = `
    Page ${data["page"]} of ${data["page_count"]}
  `;
}


function submit(event) {
    event.preventDefault();

    // create POST request using form data
    fetch('/submit', {
            method: 'POST',
            headers: headers(csrftoken),
            body: JSON.stringify({
                'name': document.querySelector('#post-form4-msg').value,
                'email': document.querySelector('#post-form3-msg').value,
                'time': document.querySelector('#post-form5-msg').value,
                'menu': document.querySelector('#post-form1-msg').value,
                'customisations': document.querySelector('#post-form-msg').value,
                'table_for': document.querySelector('#post-form2-msg').value,


            })
        })
        .then(response => response.json())
        .then(post => {
            addPostToDOM({ 'post': post, 'user': post.author, 'position': 'front' })
            document.querySelector('#post-form4-msg').value = "";
            document.querySelector('#post-form3-msg').value = "";
            document.querySelector('#post-form1-msg').value = "";
            document.querySelector('#post-form-msg').value = "";
            document.querySelector('#post-form2-msg').value = "";
            document.querySelector('#post-form5-msg').value = "";
        })
}

function post_title(post) {
    // make a GET request to the user profile API route
    fetch(`user/${post.author}`)
        .then(response => response.json())
        .then(data => {
            add_profile_to_DOM(data);
            load_view('profile');
        })
}




function load_view(view) {
    this_view = view;
    page_num = 1;

    const profile_div = document.querySelector('#profile-div-container');
    profile_div.style.display = (view === 'profile') ? 'block' : 'none';

    const post_form_div = document.querySelector('#post-form-div');
    post_form_div.style.display = (view === 'index') ? 'block' : 'none';

    load_posts(this_view, page_num, num_of_posts);
}

function load_posts(this_view, page_num, num_of_posts) {

    // remove old posts from the DOM
    document.querySelector('#post-display-div').innerHTML = "";

    // compose url for GET request
    let url = `/posts?page=${page_num}&perPage=${num_of_posts}`;

    if (this_view === 'profile') {
        url = url.concat(`&user=${document.querySelector('#profile-div-title').innerHTML}`);
    }

    if (this_view === 'feed') {
        url = url.concat(`&feed=true`)
    }

    // make GET request to '/posts' route & consume API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.posts.forEach(post => addPostToDOM({
                'post': post,
                'user': data['requested_by'],
                'position': 'end'
            }));
            update_posts_postion(data);
        })
}



function addPostToDOM(context) {
    const post = load_post(context);

    // add listener to title (loads profile on click)
    const title = post.querySelector(".post-title");
    title.addEventListener('click', () => post_title(context.post));

    if (context.position === 'end') {
        document.querySelector('#post-display-div').append(post);
    } else {
        post.style.animationName = 'fade-in';
        post.style.animationDuration = '6s';
        document.querySelector('#post-display-div').prepend(post);
    }
}

function add_profile_to_DOM(contents) {
    const profile = load_profile(contents);
    const follow_btn = profile.querySelector("#follow-button")
    if (follow_btn) {
        follow_btn.addEventListener('click', () => follow(contents))
    }

    // replace old profile HTML with new
    document.querySelector("#profile-div-container").innerHTML = "";
    document.querySelector("#profile-div-container").appendChild(profile);
}