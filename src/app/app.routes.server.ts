import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'details/:detailsId', renderMode: RenderMode.Server },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
