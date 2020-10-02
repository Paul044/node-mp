--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6 (Ubuntu 11.6-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.3

-- Started on 2020-09-01 04:05:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 222 (class 1259 OID 3084994)
-- Name: users; Type: TABLE; Schema: public; Owner: tnyaxszl
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    age integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO tnyaxszl;

--
-- TOC entry 3978 (class 0 OID 3084994)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tnyaxszl
--

COPY public.users (id, login, password, age, "createdAt", "updatedAt", "deletedAt") FROM stdin;
a0636f6f-ce8e-4756-a761-ca29bf266b67	sssa1	pwd	13	2020-09-01 00:57:04.342+00	2020-09-01 00:57:04.342+00	\N
6d7cc841-8af2-4585-80f3-c31c287137fd	sssa2	pwd	11	2020-09-01 00:57:16.876+00	2020-09-01 00:57:16.876+00	\N
49fdebe6-e380-493f-a26c-d60e5b5fe906	sssa2	pwd	11	2020-09-01 01:04:43.112+00	2020-09-01 01:04:43.112+00	\N
\.


--
-- TOC entry 3855 (class 2606 OID 3085001)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tnyaxszl
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2020-09-01 04:05:35

--
-- PostgreSQL database dump complete
--

