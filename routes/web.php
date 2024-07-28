<?php

use App\Http\Controllers\ProfileController;
use App\Models\Pekerjaan;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', function () {
    return inertia('Welcome');
});
Route::post('store-pekerjaan', function (Request $request) {
    $getPekerjaan = Pekerjaan::where('nama', $request->nama)->whereDate('created_at', '=', now())->first();

    if ($getPekerjaan) {
        return response()->json(json_encode($getPekerjaan));
    } else {
        $pekerjaan = Pekerjaan::create([
            'inisial' => $request->inisial,
            'nama' => $request->nama,
            'pekerjaan' => $request->pekerjaan,
            'deskripsi' => $request->deskripsi,
            'uang' => number_format($request->uang),
        ]);
        return response()->json(json_encode($pekerjaan));
    }
})->name('store-pekerjaan');
