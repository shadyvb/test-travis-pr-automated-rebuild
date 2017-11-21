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

on('pull_request.edited').then( context => { console.log( context.payload.action ) } )
