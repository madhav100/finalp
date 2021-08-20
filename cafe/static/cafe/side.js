export function load_post(context) {
    const post = document.createElement('div');
    post.className = "post card";
    post.id = `${context.post.id}`;
    post.innerHTML = `
  <div class="post-body card-body px-4 py-2">
    <h3 class="post-title card-title">${context.post.author}</h3>
    <h6 class="card-subtitle mb-2 text-muted"> ${context.post.timestamp}</h6>

<p class="card-text" id="named">Name: ${context.post.name}</p>
   
<p class="card-text" id="emailed">  ${context.post.email}</p>
<p class="card-text" id="timed">  ${context.post.time}</p>
 <p class="card-text"id="menud"> Menu: ${context.post.menu}</p>
  <p class="card-text"id="customised"> Addons: ${context.post.customisations}</p>
 <p class="card-text"id="table_ford"> Table for: ${context.post.table_for}</p>

  <textarea class="card-text-editor form-control" style="display:none"></textarea>
  </div>
`

    return post;
}

export function load_profile(contents) {
    const profile = document.createElement('div');
    profile.innerHTML = `
  <h1 id="profile-div-title"></h1>
`;
    return profile;
}