on('pull_request.closed')
  .filter( context => context.payload.pull_request.base.ref == 'preprod' )
  .filter( context => context.payload.pull_request.merged )
  .then( context => {
    context.github.pullRequests.create( context.repo({ 
      title: '[Deploy] ' + context.payload.pull_request.title,
      base: 'master',
      head: context.payload.pull_request.head.ref
    }) );
  });

on('pull_request.synchronized')
  .filter( context => ! context.payload.pull_request.mergable )
  .then( context => { 
    context.github.pullRequests.createComment( context.issue({
      body: `Conflict detected, @${context.payload.pull_request.user.login} can you resolve that, please ?`
    }));
  } )
