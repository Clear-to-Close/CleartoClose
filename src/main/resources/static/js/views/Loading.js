export default function Loading(props) {
    //language=HTML
    return `
        <div class="content-height bg-slate-200 opacity-95 flex items-center justify-center text-primary">
            <div class="flex justify-center items-center">
                <svg class="animate-spin w-[48px] h-[48px] mr-3 border-b-4 border-l-4 rounded-full border-callToAction" viewBox="0 0 24 24">
                    <!-- ... -->
                </svg>
                <h1 class="text-5xl">Loading...</h1>
            </div>
        </div>
    `;
}
