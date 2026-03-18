import { Bell, Search, UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-slate-800 bg-slate-950/80 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-500"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-100 placeholder:text-slate-500 focus:ring-0 sm:text-sm bg-transparent outline-none"
            placeholder="Search tests, defects, agents..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-300 relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-800" aria-hidden="true" />

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-1.5 flex items-center p-1.5 text-slate-400 hover:text-slate-300">
              <span className="sr-only">Open user menu</span>
              <UserCircle className="h-8 w-8 text-slate-500" aria-hidden="true" />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-slate-100" aria-hidden="true">
                  Admin
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
