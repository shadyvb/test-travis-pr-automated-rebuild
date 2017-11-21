on('pull_request.closed')
  .filter( context => context.payload.pull_request.base.ref == 'preprod' )
  .filter( context => context.payload.pull_request.merged )
  .then( context => {
    return context.github.pullRequests.create( context.repo({ 
      title: '[Deploy] ' + context.payload.pull_request.title,
      base: 'master',
      head: context.payload.pull_request.head.ref
    }) );
  });

//on('pull_request').then( context => console.log(context.payload.action) )

on('pull_request.synchronize')
  .filter( context => ! context.payload.pull_request.mergeable )
  .then( context => { 
    return context.github.pullRequests.createComment( context.issue({
      body: `Conflict detected, @${context.payload.pull_request.user.login} can you resolve that, please ?`
    }));
  } )
on('pull_request.synchronize')
  .then( context => { 
    return Promise.resolve([context.payload.pull_request.mergeable, context.payload.pull_request.mergeable_state]);
  } )
/**/
//on('*').then( context => Promise.resolve([context.event, context.payload.action]) )
