"use client";
import React from "react";
import { Navbar } from "../components/home/Navbar";
import { MainPage } from "../components/home/Main";
import { Footer } from "../components/home/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <MainPage />
            <Footer />
        </>
    );
}
