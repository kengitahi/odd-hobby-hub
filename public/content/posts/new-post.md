---
layout: posts
title: New Post
date: 2025-01-30
thumbnail: /uploads/mainstreet-digital.webp
---
*\# public/admin/config.yml*backend:    name: git-gateway    branch: main *\# The branch to update*    repo: kengitahi/odd-hobby-hub
local_backend: true *\# set to true to allow decap cms to save file locally during development*
media_folder: 'public/uploads' *\# Folder to store media*public_folder: '/uploads' *\# Public URL for media*
collections:    - name: 'posts' *\# Name of the collection*      label: 'Posts' *\# Label for the admin UI*      folder: '/public/content/posts' *\# Folder where posts are stored*      create: true *\# Allow new posts to be created*      slug: '{{slug}}' *\# Post slug format*      fields: *\# The fields for each document, usually in front matter*          - {                name: 'layout',                label: 'Layout',                widget: 'hidden',                default: 'posts',            }          - { name: 'title', label: 'Title', widget: 'string' }          - {                name: 'date',                label: 'Publishing Date',                widget: 'datetime',                date_format: 'YYYY-MM-DD',            }          - { name: 'thumbnail', label: 'Featured Image', widget: 'image' }          - { name: 'body', label: 'Body', widget: 'markdown' }
