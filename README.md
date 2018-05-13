# hyper-visual

Frequently Used CLI command now listed in a clickable GUI.

## Recommendation

As you type recommendation from these place will show up:

1. ```~/.bash_history```
1. history in current context
1. scripts from nearest ```package.json```
1. followed colleague's gist

## install

Put ```hyper-visual``` into ```.hyper.js```'s plugin list.

Then add config, though they are all optional:

```js
{
    config: {
        // ...others
        visual: {
            opened: true,
            hotkey: 'Ctrl+G'
        }
    }
}
```

Then you can toggle panel with hotkey, filter result with typing in terminal, click on any command to execute it.

![screenshot](https://raw.githubusercontent.com/linonetwo/hyper-visual/master/screenshot.png)

## Context

Some command will only be used in specific circumstance.

Say you have a folder like this:

```tree
.(my-docker-project)
├── CHANGELOG.md
├── backend
│   └── Dockerfile
├── docker-compose.yml
└── frontend
    └── Dockerfile
```

Then you will frequently type ```docker-compose rm -f && docker-compose pull && docker-compose up --build -d``` in ```./my-docker-project```. But you won't type it in ```./my-docker-project/frontend```, where you will frequently type ```yarn start```.

This is folder path based context, another possible context is git context. If you are inside a folder with ```./.git```, then git related command that you used before will come into recommendation.

And sure there are some command that you will use globally, likes ```ssh some-server```. They are not belong to any local context.

### Existing task runner

Task runner like ```yarn``` is depended on some config file likes ```package.json```. If current folder contains any of those config file, tasks inside will come into recommendation.

Folder with those config file is a kind of context.

### SSH to a server

It maybe tricky to read ```userHome/.bash_profile``` on the server you ssh to. So we regard remote server as another global context.

## Upload sharable context

You may have collect tons of context for different situation. If you want, you can share it with your colleague! So just after your colleague handing his project to you, you get to know how to get his project run immediately.

### Publish

Local context knowledge resides in ```~/.hyper-visual.json```.

You can publish it to a github gist for a backup.
You can also select your favorite parts and publish them separately, so others will subscript some of them as needed.

### Subscript

If you want to adopt others context file, just add its gist address to ```.hyper.js```:

```js
{
    config: {
        // ...others
        visual: {
            opened: true,
            hotkey: 'Ctrl+G',
            gists: ['some gist id']
        }
    }
}
```

## Reference

This project is heavily inspired by [hyper-history](https://github.com/garyxuehong/hyper-history)'s implementation and [autoJump](https://github.com/wting/autojump)'s concept.

And I also read code from these projects:

- [hyper-startup](https://github.com/curz46/hyper-startup/blob/master/index.js)
