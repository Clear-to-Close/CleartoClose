export default function Error404(props) {
    //language=HTML
    return `
        <div class="content-height bg-slate-200 opacity-95 flex items-center justify-center text-primary">
            <div class="flex flex-col justify-center items-center text-center">
                <img class="w-1/3 h-1/3" src="https://cdn-icons-png.flaticon.com/512/103/103085.png" alt="">
                <h1 class="text-5xl m-1">System Error</h1>
                <div class="text-4xl m-1">We’ve encountered a problem.</div>
                <div class="text-4xl m-1">We are looking into it.</div>
            </div>
        </div>`;
}
