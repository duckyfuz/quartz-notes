**Background**
- there has been a surge in cross-layer design protocols for wireless networks
	- emphasis on performance aspects
	- layered protocol architectures may not be as suitable for wireless networks
- cross-layer designs exploit the dependance between layers for performance gains

### Understanding Cross-Layer Design
- layered architecture (like OSI) divides networking tasks into layers with defined services and hierarchy
	- communication is typically restricted between adjacent layers
- protocol design by violating a reference layered communication architecture is cross-layer design
	- eg. new interfaces, redefined boundaries, designing based on other layers' details, joint parameter tuning
	- gives up independent protocol design at different layers
	- undermine the architecture's significance and can harm system longevity if accumulated

**Motivations**
- wireless links create issues (e.g., TCP mistaking wireless errors for congestion) not handled well by strict layering
- wireless offers chances (e.g., adapting to time-varying link quality) not fully exploitable with strict layering
- wireless allows new communication modes (e.g., multi-packet reception, node cooperation) that don't fit layered architectures

**Cross-Layer Design Protocols**
![[Screenshot 2025-03-29 at 19.29.50.png]]
- **Creation of New Interfaces** (Fig. 1a-c)
    - Used for runtime information sharing.  
    - **Upward Flow:** Lower layer info to higher layer (e.g., ECN notifying TCP of congestion; PHY channel state to MAC for link adaptation). _Distinct from self-adaptation loops within a layer_.  
    - **Downward Flow:** Higher layer sets lower layer parameters (e.g., App informs Link layer of delay needs for prioritization). Can be seen as hints.  
    - **Back and Forth Flow:** Iterative collaboration between layers (e.g., PHY-MAC collaboration in NDMA for collision resolution; joint scheduling/power control).  
- **Merging of Adjacent Layers** (Fig. 1d)
    - Designing adjacent layers together into a "superlayer".  
    - No new external interfaces needed; uses existing ones.  
    - PHY-MAC collaboration can blur boundaries, tending towards this.  
- **Design Coupling Without New Interfaces** (Fig. 1e)
    - Coupling layers at design time without extra runtime interfaces.  
    - Architectural cost: replacing one layer may require changes in the coupled layer.  
    - Example: Designing MAC for PHY with multi-packet reception capability.  
- **Vertical Calibration Across Layers** (Fig. 1f)
    - Joint tuning of parameters across multiple layers for better overall performance.  
    - Example: Delay needs dictating link-layer ARQ persistence, influencing rate selection.  
    - Can be static (design time) or dynamic (runtime). Dynamic calibration needs mechanisms for parameter retrieval/update, incurring overhead and requiring accuracy.

**Implementation Proposals**
![[Screenshot 2025-03-29 at 19.32.30.png]]
- **Direct Communication Between Layers** (Fig. 2a)
    - Allow layers to communicate directly (e.g., making variables visible, using headers, internal packets like CLASS).  
    - Appealing for few interactions in existing layered systems, but raises issues like managing shared memory.  
- **A Shared Database Across Layers** (Fig. 2b)
    - A common database accessible by all layers (like a new layer for storage/retrieval).  
    - Suited for vertical calibration and realizing new interfaces.  
    - Challenge: Designing interactions between layers and the database.  
- **Completely New Abstractions** (Fig. 2c)
    - Novel ways to organize protocols (e.g., "protocol heaps" instead of stacks).  
    - Offer flexibility but require fundamentally new system implementations.


#### Open Problems
- How do different proposals **coexist**? Conflicts can arise (e.g., MAC rate adaptation vs. transport controlling link parameters). Need to establish compatibility.  
- Will a proposal **stifle future innovation**? Deploying one optimized scheme might prevent others.  
- Which couplings have the **most significant impact**? Need cost-benefit analysis (complexity vs. performance). General insights exist (Net-MAC for ad hoc, transport notifications, MAC channel knowledge, holistic energy/delay/security) but need specific solutions.  
- Are interactions/effects fully understood?  
- **When to invoke** a specific cross-layer design? Need to establish conditions where they improve performance and avoid pathological cases. Requires mechanisms for timely network state assessment.  
- Can **interfaces be standardized**? Finding a new reference architecture is a challenge. Requires synergy between performance and implementation views. Impact of information sharing delays/overheads needs considering.  
- What is the **role of the Physical Layer**? Advanced signal processing allows a bigger role than just a bit-pipe, requiring changes in higher layers.  
- Is the **point-to-point link model right for wireless**? Wireless is inherently broadcast. Exploiting this (e.g., node cooperation) requires cross-layer design and offers new opportunities.
